import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from '../../entities/inventory.entity';
import { GetAllInventoryItemsRequest } from './request';

@Injectable()
export class GetAllInventoryItemsHandler {
  constructor(@InjectRepository(InventoryItem) private readonly itemRepo: Repository<InventoryItem>) {}

  async execute(query: GetAllInventoryItemsRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const qb = this.itemRepo.createQueryBuilder('i');
    if (query.branchId) qb.andWhere('i.branch_id = :branchId', { branchId: query.branchId });
    if (query.search) qb.andWhere('i.name ILIKE :s', { s: `%${query.search}%` });
    if (query.lowStock) qb.andWhere('i.stock_quantity <= i.min_stock_level');
    qb.orderBy('i.name', 'ASC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}