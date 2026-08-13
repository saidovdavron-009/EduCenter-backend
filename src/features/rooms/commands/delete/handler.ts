import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../../entities/room.entity';

@Injectable()
export class DeleteRoomHandler {
  constructor(@InjectRepository(Room) private readonly roomRepo: Repository<Room>) {}

  async execute(id: string) {
    const room = await this.roomRepo.findOne({ where: { id } });
    if (!room) throw new NotFoundException('Xona topilmadi');
    await this.roomRepo.remove(room);
    return { message: 'Xona muvaffaqiyatli o\'chirildi' };
  }
}