import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Student } from '../../entities/student.entity';
import { User } from '../../../auth/entities/user.entity';
import { ResetStudentPasswordRequest } from './request';
import { ResetStudentPasswordResponse } from './response';

@Injectable()
export class ResetStudentPasswordHandler {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(id: string, dto: ResetStudentPasswordRequest): Promise<ResetStudentPasswordResponse> {
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) throw new NotFoundException('O\'quvchi topilmadi');

    const passwordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.userRepo.update(student.userId, { passwordHash });

    return { message: 'Parol muvaffaqiyatli yangilandi' };
  }
}
