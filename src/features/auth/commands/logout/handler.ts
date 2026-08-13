import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../../entities/user.entity';
import { LogoutResponse } from './response';

@Injectable()
export class LogoutHandler {
  constructor(
    @InjectRepository(RefreshToken) private readonly refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  async execute(userId: string, refreshToken?: string): Promise<LogoutResponse> {
    if (refreshToken) {
      await this.refreshTokenRepo.delete({ token: refreshToken, userId });
    } else {
      await this.refreshTokenRepo.delete({ userId });
    }
    return { message: 'Muvaffaqiyatli chiqildi' };
  }
}