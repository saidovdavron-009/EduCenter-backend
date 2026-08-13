import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../entities/notification.entity';
import { SendNotificationRequest } from './request';

@Injectable()
export class SendNotificationHandler {
  constructor(@InjectRepository(Notification) private readonly repo: Repository<Notification>) {}

  async execute(dto: SendNotificationRequest) {
    const notification = this.repo.create({ ...dto, sentAt: new Date() });
    const saved = await this.repo.save(notification);
    // TODO: integrate SMS (Eskiz), Telegram Bot, Email based on type
    return { id: saved.id, message: 'Xabar yuborildi' };
  }
}
