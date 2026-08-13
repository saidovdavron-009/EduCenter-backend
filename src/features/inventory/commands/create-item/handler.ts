import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from '../../entities/inventory.entity';
import { CreateInventoryItemRequest } from './request';

@Injectable()
export class CreateInventoryItemHandler {
  constructor(@InjectRepository(InventoryItem) private readonly itemRepo: Repository<InventoryItem>) {}

  async execute(dto: CreateInventoryItemRequest) {
    const item = this.itemRepo.create(dto);
    return this.itemRepo.save(item);
  }
}