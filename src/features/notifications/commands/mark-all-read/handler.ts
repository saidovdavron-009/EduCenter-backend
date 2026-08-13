import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../entities/notification.entity';

@Injectable()
export class MarkAllReadHandler {
  constructor(@InjectRepository(Notification) private readonly repo: Repository<Notification>) {}

  async execute(userId: string) {
    await this.repo.update({ userId, isRead: false }, { isRead: true });
    return { message: 'Barcha xabarlar o\'qilgan deb belgilandi' };
  }
}