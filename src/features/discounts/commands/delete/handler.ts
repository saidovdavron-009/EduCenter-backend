import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '../../entities/discount.entity';

@Injectable()
export class DeleteDiscountHandler {
  constructor(@InjectRepository(Discount) private readonly repo: Repository<Discount>) {}

  async execute(id: string) {
    const discount = await this.repo.findOne({ where: { id } });
    if (!discount) throw new NotFoundException('Chegirma topilmadi');
    await this.repo.remove(discount);
    return { message: 'Chegirma o\'chirildi' };
  }
}
