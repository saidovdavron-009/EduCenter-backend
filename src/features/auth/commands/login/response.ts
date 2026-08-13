import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../../common/types';

export class LoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  user: {
    id: string;
    email: string | null;
    loginId: string | null;
    role: UserRole;
    avatarUrl: string | null;
  };
}