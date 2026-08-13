import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, RefreshToken, OtpCode } from './entities/user.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { Student } from '../students/entities/student.entity';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { LoginHandler } from './commands/login/handler';
import { LogoutHandler } from './commands/logout/handler';
import { RefreshTokenHandler } from './commands/refresh-token/handler';
import { ForgotPasswordHandler } from './commands/forgot-password/handler';
import { ResetPasswordHandler } from './commands/reset-password/handler';
import { ChangePasswordHandler } from './commands/change-password/handler';
import { UpdateAvatarHandler } from './commands/update-avatar/handler';
import { UpdateProfileHandler } from './commands/update-profile/handler';
import { GetProfileHandler } from './queries/get-profile/handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken, OtpCode, Teacher, Student]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: config.get('JWT_ACCESS_EXPIRES_IN', '7d') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    LoginHandler,
    LogoutHandler,
    RefreshTokenHandler,
    ForgotPasswordHandler,
    ResetPasswordHandler,
    ChangePasswordHandler,
    UpdateAvatarHandler,
    UpdateProfileHandler,
    GetProfileHandler,
  ],
  exports: [TypeOrmModule, JwtModule],
})
export class AuthModule {}