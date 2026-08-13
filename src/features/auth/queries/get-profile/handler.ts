import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { GetProfileResponse } from './response';
import { UserRole } from '../../../../common/types';

const PROFILE_QUERY_BY_ROLE: Partial<Record<UserRole, string>> = {
  [UserRole.TEACHER]: `SELECT id, full_name as "fullName", avatar_url as "avatarUrl" FROM teachers WHERE user_id = $1 LIMIT 1`,
  [UserRole.STUDENT]: `SELECT id, full_name as "fullName", avatar_url as "avatarUrl" FROM students WHERE user_id = $1 LIMIT 1`,
  [UserRole.PARENT]: `SELECT id, full_name as "fullName", NULL as "avatarUrl" FROM parents WHERE user_id = $1 LIMIT 1`,
};

@Injectable()
export class GetProfileHandler {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(userId: string): Promise<GetProfileResponse> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');

    const profile = await this.loadProfile(user.id, user.role);

    return {
      id: user.id,
      email: user.email,
      loginId: user.loginId,
      role: user.role,
      isActive: user.isActive,
      avatarUrl: user.avatarUrl,
      fullName: user.fullName,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
      telegramChatId: user.telegramChatId,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      profile,
    };
  }

  private async loadProfile(userId: string, role: UserRole): Promise<Record<string, unknown> | null> {
    const query = PROFILE_QUERY_BY_ROLE[role];
    if (!query) return null;

    const rows = await this.userRepo.query(query, [userId]);
    return rows[0] ?? null;
  }
}