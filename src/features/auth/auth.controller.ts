import {
  Controller, Post, Get, Body, UseGuards, Req, HttpCode, HttpStatus, Patch, SetMetadata,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard, IS_PUBLIC_KEY } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequestUser, UserRole } from '../../common/types';
import { LoginHandler } from './commands/login/handler';
import { LogoutHandler } from './commands/logout/handler';
import { RefreshTokenHandler } from './commands/refresh-token/handler';
import { ForgotPasswordHandler } from './commands/forgot-password/handler';
import { ResetPasswordHandler } from './commands/reset-password/handler';
import { ChangePasswordHandler } from './commands/change-password/handler';
import { UpdateAvatarHandler } from './commands/update-avatar/handler';
import { UpdateProfileHandler } from './commands/update-profile/handler';
import { GetProfileHandler } from './queries/get-profile/handler';
import { LoginRequest } from './commands/login/request';
import { LogoutRequest } from './commands/logout/request';
import { RefreshTokenRequest } from './commands/refresh-token/request';
import { ForgotPasswordRequest } from './commands/forgot-password/request';
import { ResetPasswordRequest } from './commands/reset-password/request';
import { ChangePasswordRequest } from './commands/change-password/request';
import { UpdateAvatarRequest } from './commands/update-avatar/request';
import { UpdateProfileRequest } from './commands/update-profile/request';

const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@ApiTags('Auth')
@Controller('auth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthController {
  constructor(
    private readonly loginHandler: LoginHandler,
    private readonly logoutHandler: LogoutHandler,
    private readonly refreshTokenHandler: RefreshTokenHandler,
    private readonly forgotPasswordHandler: ForgotPasswordHandler,
    private readonly resetPasswordHandler: ResetPasswordHandler,
    private readonly changePasswordHandler: ChangePasswordHandler,
    private readonly updateAvatarHandler: UpdateAvatarHandler,
    private readonly updateProfileHandler: UpdateProfileHandler,
    private readonly getProfileHandler: GetProfileHandler,
  ) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Tizimga kirish' })
  login(@Body() dto: LoginRequest, @Req() req: Request) {
    const ip = req.ip;
    const userAgent = req.get('user-agent');
    return this.loginHandler.execute(dto, ip, userAgent);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tizimdan chiqish' })
  logout(@CurrentUser() user: RequestUser, @Body() dto: LogoutRequest) {
    return this.logoutHandler.execute(user.id, dto.refreshToken);
  }

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Access token yangilash' })
  refresh(@Body() dto: RefreshTokenRequest) {
    return this.refreshTokenHandler.execute(dto);
  }

  @Post('forgot-password')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Parolni tiklash uchun OTP yuborish' })
  forgotPassword(@Body() dto: ForgotPasswordRequest) {
    return this.forgotPasswordHandler.execute(dto);
  }

  @Post('reset-password')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'OTP orqali parolni tiklash' })
  resetPassword(@Body() dto: ResetPasswordRequest) {
    return this.resetPasswordHandler.execute(dto);
  }

  @Patch('change-password')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Parolni o\'zgartirish' })
  changePassword(@CurrentUser() user: RequestUser, @Body() dto: ChangePasswordRequest) {
    return this.changePasswordHandler.execute(user.id, dto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Profilni ko\'rish' })
  getProfile(@CurrentUser() user: RequestUser) {
    return this.getProfileHandler.execute(user.id);
  }

  @Patch('avatar')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Profil rasmini saqlash' })
  updateAvatar(@CurrentUser() user: RequestUser, @Body() dto: UpdateAvatarRequest) {
    return this.updateAvatarHandler.execute(user.id, dto.avatarUrl);
  }

  @Patch('profile')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin profil ma\'lumotlarini yangilash' })
  updateProfile(@CurrentUser() user: RequestUser, @Body() dto: UpdateProfileRequest) {
    return this.updateProfileHandler.execute(user.id, dto);
  }
}