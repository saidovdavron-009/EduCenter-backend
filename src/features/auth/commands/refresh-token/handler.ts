import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { User, RefreshToken } from '../../entities/user.entity';
import { RefreshTokenRequest } from './request';
import { RefreshTokenResponse } from './response';

@Injectable()
export class RefreshTokenHandler {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(RefreshToken) private readonly refreshTokenRepo: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async execute(dto: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const stored = await this.refreshTokenRepo.findOne({ where: { token: dto.refreshToken } });
    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token yaroqsiz yoki muddati tugagan');
    }

    const user = await this.userRepo.findOne({ where: { id: stored.userId, isActive: true } });
    if (!user) throw new UnauthorizedException('Foydalanuvchi topilmadi');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
      expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN', '7d'),
    });

    const newRefreshToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await this.refreshTokenRepo.update(stored.id, { token: newRefreshToken, expiresAt });

    return { accessToken, refreshToken: newRefreshToken };
  }
}