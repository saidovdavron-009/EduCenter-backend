import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString, IsOptional, IsUUID } from 'class-validator';
import { NotificationType } from '../../../../common/types';
export class SendBulkNotificationRequest {
  @ApiProperty({ type: [String] }) @IsArray() @IsUUID(undefined, { each: true }) userIds: string[];
  @ApiProperty({ enum: NotificationType }) @IsEnum(NotificationType) type: NotificationType;
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsString() message: string;
  @ApiPropertyOptional() @IsOptional() data?: Record<string, any>;
}