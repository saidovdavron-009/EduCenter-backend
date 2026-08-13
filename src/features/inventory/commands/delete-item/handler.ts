import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from '../../entities/inventory.entity';

@Injectable()
export class DeleteInventoryItemHandler {
  constructor(@InjectRepository(InventoryItem) private readonly itemRepo: Repository<InventoryItem>) {}

  async execute(id: string) {
    const item = await this.itemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Mahsulot topilmadi');
    await this.itemRepo.remove(item);
    return { message: 'Mahsulot o\'chirildi' };
  }
}