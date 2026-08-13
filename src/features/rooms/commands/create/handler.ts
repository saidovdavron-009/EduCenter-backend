import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../../entities/room.entity';
import { CreateRoomRequest } from './request';
import { CreateRoomResponse } from './response';

@Injectable()
export class CreateRoomHandler {
  constructor(@InjectRepository(Room) private readonly roomRepo: Repository<Room>) {}

  async execute(dto: CreateRoomRequest): Promise<CreateRoomResponse> {
    const room = this.roomRepo.create(dto);
    return this.roomRepo.save(room);
  }
}