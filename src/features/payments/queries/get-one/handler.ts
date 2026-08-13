import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';

@Injectable()
export class GetOnePaymentHandler {
  constructor(@InjectRepository(Payment) private readonly repo: Repository<Payment>) {}

  async execute(id: string) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('To\'lov topilmadi');
    return p;
  }
}