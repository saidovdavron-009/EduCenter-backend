import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../../entities/teacher.entity';
import { User } from '../../../auth/entities/user.entity';

@Injectable()
export class GetOneTeacherHandler {
  constructor(
    @InjectRepository(Teacher) private readonly repo: Repository<Teacher>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(id: string) {
    const teacher = await this.repo.findOne({ where: { id } });
    if (!teacher) throw new NotFoundException('O\'qituvchi topilmadi');

    const user = await this.userRepo.findOne({ where: { id: teacher.userId }, select: ['loginId'] });

    const groups = await this.repo.query(
      `SELECT g.id, g.name, s.name as subject_name, g.status,
              COUNT(DISTINCT gs.student_id) FILTER (WHERE gs.status='ACTIVE') as student_count
       FROM groups g
       LEFT JOIN subjects s ON s.id = g.subject_id
       LEFT JOIN group_students gs ON gs.group_id = g.id
       WHERE g.teacher_id = $1
       GROUP BY g.id, s.name`,
      [id],
    );

    return { ...teacher, loginId: user?.loginId || null, groups };
  }
}