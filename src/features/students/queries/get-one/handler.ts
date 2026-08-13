import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../entities/student.entity';
import { User } from '../../../auth/entities/user.entity';
import { GetOneStudentResponse } from './response';

@Injectable()
export class GetOneStudentHandler {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(id: string): Promise<GetOneStudentResponse> {
    const student = await this.studentRepo
      .createQueryBuilder('s')
      .leftJoin('s.user', 'u')
      .addSelect(['u.email', 'u.isActive'])
      .leftJoinAndSelect('group_students', 'gs', 'gs.student_id = s.id AND gs.status = :status', { status: 'ACTIVE' })
      .leftJoinAndSelect('groups', 'g', 'g.id = gs.group_id')
      .leftJoinAndSelect('subjects', 'sub', 'sub.id = g.subject_id')
      .where('s.id = :id', { id })
      .getRawOne();

    if (!student) throw new NotFoundException('O\'quvchi topilmadi');

    const fullStudent = await this.studentRepo.findOne({ where: { id } });
    const user = await this.userRepo.findOne({ where: { id: fullStudent.userId }, select: ['email', 'loginId'] });

    const groups = await this.studentRepo.query(
      `SELECT g.id, g.name, sub.name as subject_name, t.full_name as teacher_name, gs.joined_at
       FROM group_students gs
       JOIN groups g ON g.id = gs.group_id
       LEFT JOIN subjects sub ON sub.id = g.subject_id
       LEFT JOIN teachers t ON t.id = g.teacher_id
       WHERE gs.student_id = $1 AND gs.status = 'ACTIVE'`,
      [id],
    );

    return {
      ...fullStudent,
      email: user?.email || null,
      loginId: user?.loginId || null,
      groups,
    } as GetOneStudentResponse;
  }
}