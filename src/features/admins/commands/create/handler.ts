import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../../auth/entities/user.entity';
import { CreateAdminRequest } from './request';
import { UserRole } from '../../../../common/types';
import { generateLoginId, generatePassword } from '../../../../common/utils/credentials.util';

@Injectable()
export class CreateAdminHandler {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async execute(dto: CreateAdminRequest) {
    let loginId: string;
    do {
      loginId = generateLoginId();
    } while (await this.userRepo.findOne({ where: { loginId } }));
    const tempPassword = generatePassword();
    const passwordHash = await bcrypt.hash(tempPassword, 12);

    const admin = this.userRepo.create({
      loginId,
      passwordHash,
      role: UserRole.ADMIN,
      isActive: true,
      isSuperAdmin: false,
      fullName: dto.fullName,
      phone: dto.phone,
    });
    await this.userRepo.save(admin);

    return { id: admin.id, loginId, tempPassword, fullName: admin.fullName, createdAt: admin.createdAt };
  }
}
