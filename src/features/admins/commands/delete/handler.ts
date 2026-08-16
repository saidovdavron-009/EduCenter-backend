import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../auth/entities/user.entity';
import { UserRole } from '../../../../common/types';

@Injectable()
export class DeleteAdminHandler {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async execute(id: string, currentUserId: string) {
    const admin = await this.userRepo.findOne({ where: { id, role: UserRole.ADMIN } });
    if (!admin) throw new NotFoundException('Admin topilmadi');
    if (admin.isSuperAdmin) throw new ForbiddenException('Superadminni o\'chirib bo\'lmaydi');
    if (admin.id === currentUserId) throw new ForbiddenException('O\'zingizni o\'chira olmaysiz');

    await this.userRepo.delete(id);
    return { message: 'Admin o\'chirildi' };
  }
}
