import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent, StudentParent } from '../../entities/parent.entity';
import { User } from '../../../auth/entities/user.entity';

@Injectable()
export class GetOneParentHandler {
  constructor(
    @InjectRepository(Parent) private readonly parentRepo: Repository<Parent>,
    @InjectRepository(StudentParent) private readonly spRepo: Repository<StudentParent>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(id: string) {
    const parent = await this.parentRepo.findOne({ where: { id } });
    if (!parent) throw new NotFoundException('Ota-ona topilmadi');
    const students = await this.spRepo.query(
      `SELECT s.id, s.full_name as "fullName", s.phone, s.avatar_url as "avatarUrl", s.status
       FROM student_parents sp JOIN students s ON s.id = sp.student_id
       WHERE sp.parent_id = $1`,
      [id],
    );
    const user = parent.userId ? await this.userRepo.findOne({ where: { id: parent.userId }, select: ['loginId'] }) : null;
    return { ...parent, loginId: user?.loginId || null, students };
  }
}