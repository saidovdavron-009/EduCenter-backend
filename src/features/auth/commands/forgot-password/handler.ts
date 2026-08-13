import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, OtpCode } from '../../entities/user.entity';
import { ForgotPasswordRequest } from './request';
import { ForgotPasswordResponse } from './response';
import { OtpType } from '../../../../common/types';

@Injectable()
export class ForgotPasswordHandler {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(OtpCode) private readonly otpRepo: Repository<OtpCode>,
  ) {}

  async execute(dto: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const user = await this.userRepo.findOne({ where: { email: dto.email.toLowerCase() } });
    if (!user) throw new NotFoundException('Bu email bilan foydalanuvchi topilmadi');

    await this.otpRepo.delete({ email: dto.email.toLowerCase(), type: OtpType.FORGOT_PASSWORD });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    const otp = this.otpRepo.create({
      userId: user.id,
      email: dto.email.toLowerCase(),
      code,
      type: OtpType.FORGOT_PASSWORD,
      expiresAt,
    });
    await this.otpRepo.save(otp);

    // TODO: Send email with OTP code
    // await this.emailService.sendOtp(user.email, code);

    return { message: 'OTP kod emailingizga yuborildi' };
  }
}