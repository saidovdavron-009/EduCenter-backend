import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { ChangePasswordRequest } from './request';
import { ChangePasswordResponse } from './response';

@Injectable()
export class ChangePasswordHandler {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(userId: string, dto: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');

    const isMatch = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isMatch) throw new BadRequestException('Joriy parol noto\'g\'ri');

    const passwordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.userRepo.update(userId, { passwordHash });

    return { message: 'Parol muvaffaqiyatli o\'zgartirildi' };
  }
}