import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../auth/entities/user.entity';
import { UpdateAdminRequest } from './request';
import { UserRole } from '../../../../common/types';

@Injectable()
export class UpdateAdminHandler {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async execute(id: string, dto: UpdateAdminRequest, currentUserId: string) {
    const admin = await this.userRepo.findOne({ where: { id, role: UserRole.ADMIN } });
    if (!admin) throw new NotFoundException('Admin topilmadi');
    if (admin.isSuperAdmin) throw new ForbiddenException('Superadmin holatini o\'zgartirib bo\'lmaydi');
    if (admin.id === currentUserId && dto.isActive === false) {
      throw new ForbiddenException('O\'zingizni bloklay olmaysiz');
    }

    await this.userRepo.update(id, dto);
    return this.userRepo.findOne({ where: { id } });
  }
}
