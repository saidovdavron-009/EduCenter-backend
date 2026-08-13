import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, OtpCode } from '../../entities/user.entity';
import { ResetPasswordRequest } from './request';
import { ResetPasswordResponse } from './response';
import { OtpType } from '../../../../common/types';

@Injectable()
export class ResetPasswordHandler {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(OtpCode) private readonly otpRepo: Repository<OtpCode>,
  ) {}

  async execute(dto: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const otp = await this.otpRepo.findOne({
      where: { email: dto.email.toLowerCase(), code: dto.code, type: OtpType.FORGOT_PASSWORD },
    });

    if (!otp) throw new BadRequestException('OTP kod noto\'g\'ri');
    if (otp.usedAt) throw new BadRequestException('OTP kod allaqachon ishlatilgan');
    if (otp.expiresAt < new Date()) throw new BadRequestException('OTP kodning muddati tugagan');

    const user = await this.userRepo.findOne({ where: { email: dto.email.toLowerCase() } });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');

    const passwordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.userRepo.update(user.id, { passwordHash });
    await this.otpRepo.update(otp.id, { usedAt: new Date() });

    return { message: 'Parol muvaffaqiyatli yangilandi' };
  }
}