import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Teacher } from '../../../teachers/entities/teacher.entity';
import { Student } from '../../../students/entities/student.entity';
import { UserRole } from '../../../../common/types';

@Injectable()
export class UpdateAvatarHandler {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>,
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
  ) {}

  async execute(userId: string, avatarUrl: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    await this.userRepo.update(userId, { avatarUrl });

    if (user?.role === UserRole.TEACHER) {
      await this.teacherRepo.update({ userId }, { avatarUrl });
    } else if (user?.role === UserRole.STUDENT) {
      await this.studentRepo.update({ userId }, { avatarUrl });
    }

    return { avatarUrl };
  }
}
