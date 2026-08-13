import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem, InventoryLog } from '../../entities/inventory.entity';

@Injectable()
export class GetOneInventoryItemHandler {
  constructor(
    @InjectRepository(InventoryItem) private readonly itemRepo: Repository<InventoryItem>,
    @InjectRepository(InventoryLog) private readonly logRepo: Repository<InventoryLog>,
  ) {}

  async execute(id: string) {
    const item = await this.itemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Mahsulot topilmadi');
    const logs = await this.logRepo.find({ where: { itemId: id }, order: { createdAt: 'DESC' }, take: 20 });
    return { ...item, logs };
  }
}