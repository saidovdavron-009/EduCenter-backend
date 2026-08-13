import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationsController } from './notifications.controller';
import { SendNotificationHandler } from './commands/send/handler';
import { SendBulkNotificationHandler } from './commands/send-bulk/handler';
import { MarkReadHandler } from './commands/mark-read/handler';
import { MarkAllReadHandler } from './commands/mark-all-read/handler';
import { GetAllNotificationsHandler } from './queries/get-all/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationsController],
  providers: [SendNotificationHandler, SendBulkNotificationHandler, MarkReadHandler, MarkAllReadHandler, GetAllNotificationsHandler],
  exports: [TypeOrmModule, SendNotificationHandler],
})
export class NotificationsModule {}