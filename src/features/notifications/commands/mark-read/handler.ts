import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../entities/notification.entity';

@Injectable()
export class MarkReadHandler {
  constructor(@InjectRepository(Notification) private readonly repo: Repository<Notification>) {}

  async execute(id: string, userId: string) {
    const n = await this.repo.findOne({ where: { id, userId } });
    if (!n) throw new NotFoundException('Xabar topilmadi');
    await this.repo.update(id, { isRead: true });
    return { message: 'O\'qilgan deb belgilandi' };
  }
}