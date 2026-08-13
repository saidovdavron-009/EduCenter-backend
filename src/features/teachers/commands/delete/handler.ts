import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../../entities/teacher.entity';
import { User } from '../../../auth/entities/user.entity';

@Injectable()
export class DeleteTeacherHandler {
  constructor(
    @InjectRepository(Teacher) private readonly repo: Repository<Teacher>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(id: string) {
    const teacher = await this.repo.findOne({ where: { id } });
    if (!teacher) throw new NotFoundException('O\'qituvchi topilmadi');
    await this.repo.update(id, { isActive: false });
    await this.userRepo.update(teacher.userId, { isActive: false });
    return { message: 'O\'qituvchi faolligi bekor qilindi' };
  }
}