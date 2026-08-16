import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../auth/entities/user.entity';
import { UserRole } from '../../../../common/types';

@Injectable()
export class GetAllAdminsHandler {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  // The super admin never appears here, even to themselves — this list is for
  // managing the regular admins they create, not for exposing their own record.
  async execute() {
    return this.userRepo.find({
      where: { role: UserRole.ADMIN, isSuperAdmin: false },
      order: { createdAt: 'ASC' },
      select: ['id', 'loginId', 'fullName', 'phone', 'isActive', 'isSuperAdmin', 'createdAt'],
    });
  }
}
