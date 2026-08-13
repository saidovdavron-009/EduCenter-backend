import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { UpdatePaymentRequest } from './request';

@Injectable()
export class UpdatePaymentHandler {
  constructor(@InjectRepository(Payment) private readonly repo: Repository<Payment>) {}

  async execute(id: string, dto: UpdatePaymentRequest) {
    const payment = await this.repo.findOne({ where: { id } });
    if (!payment) throw new NotFoundException('To\'lov topilmadi');
    const data: any = { ...dto };
    if (dto.paidAt) data.paidAt = new Date(dto.paidAt);
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id } });
  }
}