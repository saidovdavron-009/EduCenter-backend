import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../entities/notification.entity';
import { GetAllNotificationsRequest } from './request';

@Injectable()
export class GetAllNotificationsHandler {
  constructor(@InjectRepository(Notification) private readonly repo: Repository<Notification>) {}

  async execute(userId: string, query: GetAllNotificationsRequest) {
    const { page = 1, limit = 20, isRead } = query;
    const offset = (page - 1) * limit;

    const where: any = { userId };
    if (isRead !== undefined) where.isRead = isRead;

    const [data, total] = await this.repo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    const unreadCount = await this.repo.count({ where: { userId, isRead: false } });

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit), unreadCount },
    };
  }
}