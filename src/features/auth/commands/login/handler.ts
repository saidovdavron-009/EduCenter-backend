import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User, RefreshToken } from '../../entities/user.entity';
import { LoginRequest } from './request';
import { LoginResponse } from './response';

@Injectable()
export class LoginHandler {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(RefreshToken) private readonly refreshTokenRepo: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async execute(dto: LoginRequest, ip?: string, userAgent?: string): Promise<LoginResponse> {
    const login = dto.login.trim();
    const user = await this.userRepo.findOne({ where: { loginId: login } });
    if (!user) throw new UnauthorizedException('ID yoki parol noto\'g\'ri');
    if (!user.isActive) throw new UnauthorizedException('Akkaunt bloklangan. Admin bilan bog\'laning');

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException('ID yoki parol noto\'g\'ri');

    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
      expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN', '7d'),
    });

    const refreshTokenValue = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await this.refreshTokenRepo.delete({ userId: user.id });

    const refreshToken = this.refreshTokenRepo.create({
      userId: user.id,
      token: refreshTokenValue,
      expiresAt,
      ipAddress: ip,
      userAgent,
    });
    await this.refreshTokenRepo.save(refreshToken);

    await this.userRepo.update(user.id, { lastLoginAt: new Date() });

    return {
      accessToken,
      refreshToken: refreshTokenValue,
      user: { id: user.id, email: user.email, loginId: user.loginId, role: user.role, avatarUrl: user.avatarUrl, isSuperAdmin: user.isSuperAdmin },
    };
  }
}