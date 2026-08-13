import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../../entities/expense.entity';

@Injectable()
export class DeleteExpenseHandler {
  constructor(@InjectRepository(Expense) private readonly repo: Repository<Expense>) {}

  async execute(id: string) {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException('Xarajat topilmadi');
    await this.repo.delete(id);
    return { message: 'Xarajat o\'chirildi' };
  }
}