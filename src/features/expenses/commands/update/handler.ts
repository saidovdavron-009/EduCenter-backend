import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../../entities/expense.entity';
import { UpdateExpenseRequest } from './request';

@Injectable()
export class UpdateExpenseHandler {
  constructor(@InjectRepository(Expense) private readonly repo: Repository<Expense>) {}

  async execute(id: string, dto: UpdateExpenseRequest) {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException('Xarajat topilmadi');
    const data: any = { ...dto };
    if (dto.date) data.date = new Date(dto.date);
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id } });
  }
}