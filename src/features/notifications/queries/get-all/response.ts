import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '../../../../common/types';
export class NotificationItem {
  @ApiProperty() id: string; @ApiProperty({ enum: NotificationType }) type: NotificationType;
  @ApiProperty() title: string; @ApiProperty() message: string;
  @ApiProperty() isRead: boolean; @ApiProperty() createdAt: Date;
}