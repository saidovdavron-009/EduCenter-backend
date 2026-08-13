import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '../../entities/discount.entity';
import { UpdateDiscountRequest } from './request';

@Injectable()
export class UpdateDiscountHandler {
  constructor(@InjectRepository(Discount) private readonly repo: Repository<Discount>) {}

  async execute(id: string, dto: UpdateDiscountRequest) {
    const discount = await this.repo.findOne({ where: { id } });
    if (!discount) throw new NotFoundException('Chegirma topilmadi');
    Object.assign(discount, dto);
    return this.repo.save(discount);
  }
}
