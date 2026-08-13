import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../../entities/room.entity';
import { GetAllRoomsRequest } from './request';

@Injectable()
export class GetAllRoomsHandler {
  constructor(@InjectRepository(Room) private readonly roomRepo: Repository<Room>) {}

  async execute(query: GetAllRoomsRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const qb = this.roomRepo.createQueryBuilder('r');
    if (query.branchId) qb.where('r.branch_id = :branchId', { branchId: query.branchId });
    qb.orderBy('r.name', 'ASC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}