import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '../../entities/discount.entity';
import { CreateDiscountRequest } from './request';

@Injectable()
export class CreateDiscountHandler {
  constructor(@InjectRepository(Discount) private readonly repo: Repository<Discount>) {}

  async execute(dto: CreateDiscountRequest) {
    const discount = this.repo.create(dto);
    return this.repo.save(discount);
  }
}
