import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonSession } from '../../entities/lesson-session.entity';
import { Teacher } from '../../../teachers/entities/teacher.entity';
import { AuditLogService } from '../../../settings/services/audit-log.service';
import { assertBeforeLessonEnds } from '../../../../common/utils/lesson-window.util';
import { AuditAction, LessonSessionStatus } from '../../../../common/types';
import { AssignSubstituteTeacherRequest } from './request';

// "O'qituvchini almashtirish" tugmasi — faqat SHU bitta lesson_session'ga
// tegishli, assignedTeacherId (guruhning asosiy o'qituvchisi) o'zgarmaydi.
// Dars tugashiga qadar (oldindan yoki dars vaqtida) chaqirilishi mumkin,
// lekin davomatning o'zi hamon faqat dars vaqtida yakunlanadi (mark-teacher).
// Bir kunda ikki marta almashtirilsa — faqat oxirgi actualTeacherId saqlanadi,
// lekin har bir o'zgarish audit_logs'ga yoziladi (tarix yo'qolmaydi).
@Injectable()
export class AssignSubstituteTeacherHandler {
  constructor(
    @InjectRepository(LessonSession) private readonly repo: Repository<LessonSession>,
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>,
    private readonly auditLog: AuditLogService,
  ) {}

  async execute(id: string, dto: AssignSubstituteTeacherRequest, changedBy: string) {
    const session = await this.repo.findOne({ where: { id } });
    if (!session) throw new NotFoundException('Dars sessiyasi topilmadi');

    if (session.status === LessonSessionStatus.CONDUCTED) {
      throw new BadRequestException("Dars allaqachon o'tilgan deb belgilangan — endi almashtirib bo'lmaydi");
    }
    if (session.status === LessonSessionStatus.CANCELLED) {
      throw new BadRequestException("Bekor qilingan darsga o'qituvchi almashtirib bo'lmaydi");
    }

    assertBeforeLessonEnds({ endTime: session.plannedEndTime }, session.date);

    const substitute = await this.teacherRepo.findOne({ where: { id: dto.substituteTeacherId } });
    if (!substitute) throw new NotFoundException("Almashtiruvchi o'qituvchi topilmadi");
    if (!substitute.isActive) throw new BadRequestException("Faqat faol o'qituvchini tanlash mumkin");

    const previousTeacherId = session.actualTeacherId;

    session.actualTeacherId = dto.substituteTeacherId;
    session.isSubstitution = dto.substituteTeacherId !== session.assignedTeacherId;
    const saved = await this.repo.save(session);

    await this.auditLog.record({
      userId: changedBy,
      action: AuditAction.UPDATE,
      tableName: 'lesson_sessions',
      rowId: session.id,
      oldValues: { actualTeacherId: previousTeacherId },
      newValues: { actualTeacherId: dto.substituteTeacherId },
    });

    return saved;
  }
}
