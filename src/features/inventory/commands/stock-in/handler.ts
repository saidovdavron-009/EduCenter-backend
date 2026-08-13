import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem, InventoryLog } from '../../entities/inventory.entity';
import { StockInRequest } from './request';
import { InventoryLogType, RequestUser } from '../../../../common/types';

@Injectable()
export class StockInHandler {
  constructor(
    @InjectRepository(InventoryItem) private readonly itemRepo: Repository<InventoryItem>,
    @InjectRepository(InventoryLog) private readonly logRepo: Repository<InventoryLog>,
  ) {}

  async execute(dto: StockInRequest, user: RequestUser) {
    const item = await this.itemRepo.findOne({ where: { id: dto.itemId } });
    if (!item) throw new NotFoundException('Mahsulot topilmadi');

    item.stockQuantity += dto.quantity;
    await this.itemRepo.save(item);

    const log = this.logRepo.create({
      itemId: dto.itemId,
      type: InventoryLogType.IN,
      quantity: dto.quantity,
      reason: dto.reason,
      actionBy: user.id,
    });
    await this.logRepo.save(log);

    return { id: log.id, itemId: dto.itemId, newStock: item.stockQuantity, quantity: dto.quantity, type: InventoryLogType.IN };
  }
}