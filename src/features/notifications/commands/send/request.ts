import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsString, IsOptional } from 'class-validator';
import { NotificationType } from '../../../../common/types';
export class SendNotificationRequest {
  @ApiProperty() @IsUUID() userId: string;
  @ApiProperty({ enum: NotificationType }) @IsEnum(NotificationType) type: NotificationType;
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsString() message: string;
  @ApiPropertyOptional() @IsOptional() data?: Record<string, any>;
}
