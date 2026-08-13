import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../../entities/room.entity';
import { UpdateRoomRequest } from './request';

@Injectable()
export class UpdateRoomHandler {
  constructor(@InjectRepository(Room) private readonly roomRepo: Repository<Room>) {}

  async execute(id: string, dto: UpdateRoomRequest) {
    const room = await this.roomRepo.findOne({ where: { id } });
    if (!room) throw new NotFoundException('Xona topilmadi');
    Object.assign(room, dto);
    return this.roomRepo.save(room);
  }
}