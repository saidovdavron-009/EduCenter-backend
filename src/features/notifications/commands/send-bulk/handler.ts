import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../entities/notification.entity';
import { SendBulkNotificationRequest } from './request';

@Injectable()
export class SendBulkNotificationHandler {
  constructor(@InjectRepository(Notification) private readonly repo: Repository<Notification>) {}

  async execute(dto: SendBulkNotificationRequest) {
    const notifications = dto.userIds.map((userId) =>
      this.repo.create({ userId, type: dto.type, title: dto.title, message: dto.message, data: dto.data, sentAt: new Date() }),
    );
    await this.repo.save(notifications);
    return { count: notifications.length, message: `${notifications.length} ta xabar yuborildi` };
  }
}