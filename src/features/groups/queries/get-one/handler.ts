import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../../entities/group.entity';

@Injectable()
export class GetOneGroupHandler {
  constructor(@InjectRepository(Group) private readonly repo: Repository<Group>) {}

  async execute(id: string) {
    const group = await this.repo.findOne({ where: { id } });
    if (!group) throw new NotFoundException('Guruh topilmadi');

    const [students, schedules, countResult] = await Promise.all([
      this.repo.query(
        `SELECT s.id, s.full_name as "fullName", s.phone, s.avatar_url as "avatarUrl", s.status, gs.joined_at as "joinedAt"
         FROM group_students gs JOIN students s ON s.id = gs.student_id
         WHERE gs.group_id = $1 AND gs.status = 'ACTIVE' ORDER BY s.full_name`, [id],
      ),
      this.repo.query(
        `SELECT id, day_of_week as "dayOfWeek", start_time as "startTime", end_time as "endTime", room
         FROM schedules WHERE group_id = $1 ORDER BY day_of_week`, [id],
      ),
      this.repo.query(
        `SELECT COUNT(*) FROM group_students WHERE group_id = $1 AND status = 'ACTIVE'`, [id],
      ),
    ]);

    return {
      ...group,
      currentCount: parseInt(countResult[0]?.count || '0'),
      students,
      schedules,
    };
  }
}