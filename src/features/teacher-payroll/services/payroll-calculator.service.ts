import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../../groups/entities/group.entity';
import { Schedule } from '../../schedules/entities/schedule.entity';
import { LessonSession } from '../../lesson-sessions/entities/lesson-session.entity';
import { datesMatchingDayOfWeek } from '../../../common/utils/work-days.util';

// dars_narxi = group.monthlyPriceForTeacher / group.lessons_per_month (shu oy uchun).
// Bu summa GURUHNING xususiyati — kim o'tganidan (asl yoki almashtiruvchi)
// qat'i nazar bir xil; TeacherPayrollEntry.teacherId ga (actual_teacher_id)
// yoziladi, lekin summaning o'zi shu formuladan o'zgarmaydi.
@Injectable()
export class PayrollCalculatorService {
  constructor(
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    @InjectRepository(Schedule) private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async calculateLessonAmount(session: LessonSession): Promise<number> {
    const group = await this.groupRepo.findOne({ where: { id: session.groupId } });
    if (!group || !group.monthlyPriceForTeacher) return 0;

    const lessonsPerMonth = await this.lessonsPerMonth(group.id, session.date);
    return Number(group.monthlyPriceForTeacher) / lessonsPerMonth;
  }

  async lessonsPerMonth(groupId: string, dateInMonth: string): Promise<number> {
    const date = new Date(`${dateInMonth}T00:00:00`);
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().slice(0, 10);

    const schedules = await this.scheduleRepo.find({ where: { groupId } });
    const expectedDates = new Set<string>();
    for (const schedule of schedules) {
      for (const d of datesMatchingDayOfWeek(monthStart, monthEnd, schedule.dayOfWeek)) expectedDates.add(d);
    }
    return expectedDates.size || 1;
  }
}
