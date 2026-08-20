import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { LessonSession } from '../../entities/lesson-session.entity';
import { TeacherPayrollEntry } from '../../../teacher-payroll/entities/teacher-payroll-entry.entity';
import { PayrollCalculatorService } from '../../../teacher-payroll/services/payroll-calculator.service';
import { LateCorrectionService } from '../../../settings/services/late-correction.service';
import { AuditLogService } from '../../../settings/services/audit-log.service';
import { GroupStudent, Student } from '../../../students/entities/student.entity';
import { Notification } from '../../../notifications/entities/notification.entity';
import { assertWithinLessonWindow } from '../../../../common/utils/lesson-window.util';
import { AuditAction, LessonSessionStatus, NotificationType, RequestUser } from '../../../../common/types';
import { MarkLessonTeacherRequest } from './request';

// "Davomat qilish" tugmasi — dars sessiyasini yakunlaydi. Faqat dars vaqti
// ichida (boshlanishidan tugashigacha) chaqirilishi mumkin — super-admin
// lateCorrectionReason bilan bu qoidani chetlab o'tishi mumkin, audit log bilan.
// actualTeacherId berilmasa — avval assign-substitute orqali belgilangan
// o'qituvchi yoki (almashtirilmagan bo'lsa) guruhning asosiy o'qituvchisi ishlatiladi.
@Injectable()
export class MarkLessonTeacherHandler {
  constructor(
    @InjectRepository(LessonSession) private readonly repo: Repository<LessonSession>,
    @InjectRepository(TeacherPayrollEntry) private readonly payrollRepo: Repository<TeacherPayrollEntry>,
    @InjectRepository(GroupStudent) private readonly groupStudentRepo: Repository<GroupStudent>,
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    @InjectRepository(Notification) private readonly notificationRepo: Repository<Notification>,
    private readonly calculator: PayrollCalculatorService,
    private readonly lateCorrection: LateCorrectionService,
    private readonly auditLog: AuditLogService,
  ) {}

  async execute(id: string, dto: MarkLessonTeacherRequest, user: RequestUser) {
    const session = await this.repo.findOne({ where: { id } });
    if (!session) throw new NotFoundException('Dars sessiyasi topilmadi');

    const previousStatus = session.status;

    const bypass = await this.lateCorrection.authorize(user, dto.lateCorrectionReason, 'lesson_sessions', session.id);
    assertWithinLessonWindow(
      { startTime: session.plannedStartTime, endTime: session.plannedEndTime },
      session.date,
      { bypass },
    );

    await this.payrollRepo.delete({ lessonSessionId: session.id });

    const conducted = dto.conducted !== false;

    if (conducted) {
      const teacherId = dto.actualTeacherId || session.actualTeacherId || session.assignedTeacherId;
      session.actualTeacherId = teacherId;
      session.isSubstitution = teacherId !== session.assignedTeacherId;
      session.status = LessonSessionStatus.CONDUCTED;
      session.attendanceMarkedAt = new Date();
      session.markedByAdminId = user.id;
      await this.repo.save(session);

      const amount = await this.calculator.calculateLessonAmount(session);
      const entry = this.payrollRepo.create({
        lessonSessionId: session.id,
        teacherId,
        groupId: session.groupId,
        amount,
        date: session.date,
      });
      await this.payrollRepo.save(entry);
    } else {
      session.actualTeacherId = null;
      session.isSubstitution = false;
      session.status = LessonSessionStatus.NOT_CONDUCTED;
      session.attendanceMarkedAt = new Date();
      session.markedByAdminId = user.id;
      await this.repo.save(session);

      await this.notifyGroupStudents(session);
    }

    await this.auditLog.record({
      userId: user.id,
      action: AuditAction.UPDATE,
      tableName: 'lesson_sessions',
      rowId: session.id,
      oldValues: { status: previousStatus },
      newValues: { status: session.status, actualTeacherId: session.actualTeacherId },
    });

    return session;
  }

  // O'qituvchi ham kelmadi, hech kim almashtirmadi — guruhdagi faol
  // o'quvchilarga dars bo'lib o'tmagani haqida IN_APP bildirishnoma yuboriladi.
  private async notifyGroupStudents(session: LessonSession): Promise<void> {
    const groupStudents = await this.groupStudentRepo.find({ where: { groupId: session.groupId, status: 'ACTIVE' } });
    if (!groupStudents.length) return;

    const students = await this.studentRepo.find({
      where: { id: In(groupStudents.map((gs) => gs.studentId)) },
    });
    if (!students.length) return;

    const notifications = students.map((s) => this.notificationRepo.create({
      userId: s.userId,
      type: NotificationType.IN_APP,
      title: 'Dars bo\'lib o\'tmadi',
      message: `${session.date} sanadagi dars bekor bo'ldi.`,
      sentAt: new Date(),
    }));
    await this.notificationRepo.save(notifications);
  }
}
