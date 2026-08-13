import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from '../../entities/inventory.entity';
import { UpdateInventoryItemRequest } from './request';

@Injectable()
export class UpdateInventoryItemHandler {
  constructor(@InjectRepository(InventoryItem) private readonly itemRepo: Repository<InventoryItem>) {}

  async execute(id: string, dto: UpdateInventoryItemRequest) {
    const item = await this.itemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Mahsulot topilmadi');
    Object.assign(item, dto);
    return this.itemRepo.save(item);
  }
}