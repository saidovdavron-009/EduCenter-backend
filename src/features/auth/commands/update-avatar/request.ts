import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAvatarRequest {
  @ApiProperty({ example: '/uploads/avatars/xxx.png' })
  @IsString()
  avatarUrl: string;
}
