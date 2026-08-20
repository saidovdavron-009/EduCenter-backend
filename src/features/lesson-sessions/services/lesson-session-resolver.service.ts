import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonSession } from '../entities/lesson-session.entity';
import { Group } from '../../groups/entities/group.entity';
import { LessonSessionStatus } from '../../../common/types';

// Berilgan guruh+sana uchun LessonSession topadi, yo'q bo'lsa yaratadi.
// Davomat (student yoki teacher) birinchi marta belgilanganda "lazy" chaqiriladi —
// cron/generate orqali oldindan yaratilmagan darslar uchun ham ishlaydi.
@Injectable()
export class LessonSessionResolverService {
  constructor(
    @InjectRepository(LessonSession) private readonly repo: Repository<LessonSession>,
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
  ) {}

  async resolveOrCreate(groupId: string, date: string, startTime: string, endTime: string): Promise<LessonSession> {
    const existing = await this.repo.findOne({ where: { groupId, date } });
    if (existing) return existing;

    const group = await this.groupRepo.findOne({ where: { id: groupId } });
    const session = this.repo.create({
      groupId,
      date,
      plannedStartTime: startTime,
      plannedEndTime: endTime,
      assignedTeacherId: group?.teacherId,
      status: LessonSessionStatus.PLANNED,
    });
    return this.repo.save(session);
  }
}
