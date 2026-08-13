import { ApiProperty } from '@nestjs/swagger';
export class SendBulkNotificationResponse { @ApiProperty() count: number; @ApiProperty() message: string; }