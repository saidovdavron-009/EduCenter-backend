import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UpdateProfileRequest } from './request';

@Injectable()
export class UpdateProfileHandler {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async execute(userId: string, dto: UpdateProfileRequest) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');

    const updateData: Record<string, unknown> = { ...dto };
    if (dto.dob) updateData.dob = new Date(dto.dob);

    await this.userRepo.update(userId, updateData);
    const updated = await this.userRepo.findOne({ where: { id: userId } });
    return {
      fullName: updated.fullName,
      phone: updated.phone,
      dob: updated.dob,
      gender: updated.gender,
    };
  }
}
