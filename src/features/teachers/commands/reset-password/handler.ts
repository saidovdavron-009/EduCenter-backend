import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Teacher } from '../../entities/teacher.entity';
import { User } from '../../../auth/entities/user.entity';
import { ResetTeacherPasswordRequest } from './request';
import { ResetTeacherPasswordResponse } from './response';

@Injectable()
export class ResetTeacherPasswordHandler {
  constructor(
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(id: string, dto: ResetTeacherPasswordRequest): Promise<ResetTeacherPasswordResponse> {
    const teacher = await this.teacherRepo.findOne({ where: { id } });
    if (!teacher) throw new NotFoundException('O\'qituvchi topilmadi');

    const passwordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.userRepo.update(teacher.userId, { passwordHash });

    return { message: 'Parol muvaffaqiyatli yangilandi' };
  }
}
