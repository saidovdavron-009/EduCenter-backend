import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItem, InventoryLog, BookSale } from './entities/inventory.entity';
import { InventoryController } from './inventory.controller';
import { CreateInventoryItemHandler } from './commands/create-item/handler';
import { UpdateInventoryItemHandler } from './commands/update-item/handler';
import { DeleteInventoryItemHandler } from './commands/delete-item/handler';
import { StockInHandler } from './commands/stock-in/handler';
import { StockOutHandler } from './commands/stock-out/handler';
import { SellBookHandler } from './commands/sell-book/handler';
import { GetAllInventoryItemsHandler } from './queries/get-all-items/handler';
import { GetOneInventoryItemHandler } from './queries/get-one-item/handler';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryItem, InventoryLog, BookSale])],
  controllers: [InventoryController],
  providers: [
    CreateInventoryItemHandler, UpdateInventoryItemHandler, DeleteInventoryItemHandler,
    StockInHandler, StockOutHandler, SellBookHandler,
    GetAllInventoryItemsHandler, GetOneInventoryItemHandler,
  ],
  exports: [TypeOrmModule],
})
export class InventoryModule {}