import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffSalary } from '../../entities/staff-salary.entity';
import { User } from '../../../auth/entities/user.entity';
import { StaffAttendance } from '../../../staff-attendance/entities/staff-attendance.entity';
import { AppSetting } from '../../../settings/entities/setting.entity';
import { AuditLogService } from '../../../settings/services/audit-log.service';
import { AuditAction, UserRole, TeacherAttendanceStatus } from '../../../../common/types';
import { workingDaysInRange } from '../../../../common/utils/work-days.util';
import { CreateStaffSalaryRequest } from './request';

// Sababli (EXCUSED) kelmagan kun oylikka kiritiladimi — kompaniya siyosati,
// admin panelidagi shu AppSettings kalit orqali sozlanadi. Standart holatda
// (sozlama hali qo'yilmagan bo'lsa) sababli kun ishlangan deb hisoblanadi.
const EXCUSED_COUNTS_AS_WORKED_KEY = 'excused_absence_counts_as_worked';

// ADMIN (fan-guruhga bog'liq bo'lmagan xodim) uchun: oylik = (ish_kelgan_kunlar /
// oydagi_rejalashtirilgan_ish_kunlari) * fiks_oylik — dto.baseAmount fiks_oylik
// sifatida kiritiladi, StaffAttendance asosida haqiqiy summa hisoblanadi.
// O'qituvchilar uchun maosh endi [[teacher-payroll]] orqali yuritiladi, shuning
// uchun TEACHER rolidagi xodim uchun bu yerda hech qanday nisbat qo'llanmaydi.
@Injectable()
export class CreateStaffSalaryHandler {
  constructor(
    @InjectRepository(StaffSalary) private readonly repo: Repository<StaffSalary>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(StaffAttendance) private readonly staffAttendanceRepo: Repository<StaffAttendance>,
    @InjectRepository(AppSetting) private readonly settingRepo: Repository<AppSetting>,
    private readonly auditLog: AuditLogService,
  ) {}

  async execute(dto: CreateStaffSalaryRequest, createdBy: string) {
    const employee = await this.userRepo.findOne({ where: { id: dto.employeeId } });
    if (!employee) throw new NotFoundException('Xodim topilmadi');

    let base = Number(dto.baseAmount);

    if (employee.role === UserRole.ADMIN) {
      const expectedDays = workingDaysInRange(dto.periodStart, dto.periodEnd).length;

      const setting = await this.settingRepo.findOne({ where: { key: EXCUSED_COUNTS_AS_WORKED_KEY } });
      const excusedCountsAsWorked = setting ? setting.value !== 'false' : true;

      const qb = this.staffAttendanceRepo
        .createQueryBuilder('sa')
        .select('DISTINCT sa.date', 'date')
        .where('sa.user_id = :userId', { userId: dto.employeeId })
        .andWhere('sa.date BETWEEN :start AND :end', { start: dto.periodStart, end: dto.periodEnd });

      if (excusedCountsAsWorked) {
        qb.andWhere('sa.status IS DISTINCT FROM :absent', { absent: TeacherAttendanceStatus.ABSENT });
      } else {
        qb.andWhere('sa.status IN (:...counted)', {
          counted: [TeacherAttendanceStatus.ON_TIME, TeacherAttendanceStatus.LATE],
        });
      }

      const worked = await qb.getRawMany();
      if (expectedDays > 0) base = (worked.length / expectedDays) * Number(dto.baseAmount);
    }

    const totalPaid = base + Number(dto.bonus || 0) - Number(dto.fine || 0);
    const record = this.repo.create({ ...dto, totalPaid });
    const saved = await this.repo.save(record);

    await this.auditLog.record({
      userId: createdBy,
      action: AuditAction.CREATE,
      tableName: 'staff_salaries',
      rowId: saved.id,
      newValues: { employeeId: saved.employeeId, baseAmount: saved.baseAmount, totalPaid: saved.totalPaid },
    });

    return saved;
  }
}
