import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { LessonSession } from '../../entities/lesson-session.entity';
import { Group } from '../../../groups/entities/group.entity';
import { Schedule } from '../../../schedules/entities/schedule.entity';
import { GroupStatus, LessonSessionStatus } from '../../../../common/types';
import { datesMatchingDayOfWeek } from '../../../../common/utils/work-days.util';
import { GenerateLessonSessionsRequest } from './request';

// Faol guruhlarning schedule'iga qarab davr ichidagi barcha dars kunlari
// uchun LessonSession yaratadi. Idempotent — mavjud (group_id, date)
// juftliklarini qayta yaratmaydi.
@Injectable()
export class GenerateLessonSessionsHandler {
  constructor(
    @InjectRepository(LessonSession) private readonly repo: Repository<LessonSession>,
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    @InjectRepository(Schedule) private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async execute(dto: GenerateLessonSessionsRequest) {
    const groups = await this.groupRepo.find({ where: { status: GroupStatus.ACTIVE } });
    if (!groups.length) return { created: 0, message: "0 ta dars sessiyasi yaratildi" };

    const groupIds = groups.map((g) => g.id);
    const schedules = await this.scheduleRepo.find({ where: { groupId: In(groupIds) } });
    const groupById = new Map(groups.map((g) => [g.id, g]));

    const existingRows = await this.repo
      .createQueryBuilder('ls')
      .select(['ls.groupId', 'ls.date'])
      .where('ls.group_id IN (:...ids)', { ids: groupIds })
      .andWhere('ls.date BETWEEN :start AND :end', { start: dto.periodStart, end: dto.periodEnd })
      .getMany();
    const existingKeys = new Set(existingRows.map((r) => `${r.groupId}|${r.date}`));

    const toCreate: LessonSession[] = [];
    for (const schedule of schedules) {
      const group = groupById.get(schedule.groupId);
      if (!group) continue;

      for (const date of datesMatchingDayOfWeek(dto.periodStart, dto.periodEnd, schedule.dayOfWeek)) {
        const key = `${schedule.groupId}|${date}`;
        if (existingKeys.has(key)) continue;
        existingKeys.add(key);

        toCreate.push(this.repo.create({
          groupId: schedule.groupId,
          date,
          plannedStartTime: schedule.startTime,
          plannedEndTime: schedule.endTime,
          assignedTeacherId: group.teacherId,
          status: LessonSessionStatus.PLANNED,
        }));
      }
    }

    if (toCreate.length) await this.repo.save(toCreate);
    return { created: toCreate.length, message: `${toCreate.length} ta dars sessiyasi yaratildi` };
  }
}
