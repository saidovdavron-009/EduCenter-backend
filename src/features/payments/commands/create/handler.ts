import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { CreatePaymentRequest } from './request';
import { PaymentStatus } from '../../../../common/types';

@Injectable()
export class CreatePaymentHandler {
  constructor(@InjectRepository(Payment) private readonly repo: Repository<Payment>) {}

  async execute(dto: CreatePaymentRequest, receivedBy: string) {
    const payment = this.repo.create({
      ...dto,
      status: dto.status || PaymentStatus.PAID,
      paidAt: dto.status !== PaymentStatus.PENDING ? (dto.paidAt ? new Date(dto.paidAt) : new Date()) : null,
      dueDate: dto.dueDate ? new Date(dto.dueDate) as any : null,
      discount: dto.discount || 0,
      receivedBy,
    });
    return this.repo.save(payment);
  }
}