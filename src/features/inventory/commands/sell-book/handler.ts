import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem, InventoryLog, BookSale } from '../../entities/inventory.entity';
import { SellBookRequest } from './request';
import { InventoryLogType, RequestUser } from '../../../../common/types';

@Injectable()
export class SellBookHandler {
  constructor(
    @InjectRepository(InventoryItem) private readonly itemRepo: Repository<InventoryItem>,
    @InjectRepository(InventoryLog) private readonly logRepo: Repository<InventoryLog>,
    @InjectRepository(BookSale) private readonly saleRepo: Repository<BookSale>,
  ) {}

  async execute(dto: SellBookRequest, user: RequestUser) {
    const qty = dto.quantity ?? 1;
    const item = await this.itemRepo.findOne({ where: { id: dto.itemId } });
    if (!item) throw new NotFoundException('Mahsulot topilmadi');
    if (item.stockQuantity < qty) throw new BadRequestException(`Yetarli miqdor yo'q. Mavjud: ${item.stockQuantity}`);

    item.stockQuantity -= qty;
    await this.itemRepo.save(item);

    const log = this.logRepo.create({ itemId: dto.itemId, type: InventoryLogType.OUT, quantity: qty, reason: 'SALE', actionBy: user.id });
    await this.logRepo.save(log);

    const sale = this.saleRepo.create({ studentId: dto.studentId, itemId: dto.itemId, quantity: qty, amount: dto.amount, soldBy: user.id });
    return this.saleRepo.save(sale);
  }
}