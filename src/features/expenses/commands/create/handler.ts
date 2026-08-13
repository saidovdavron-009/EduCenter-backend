import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../../entities/expense.entity';
import { CreateExpenseRequest } from './request';

@Injectable()
export class CreateExpenseHandler {
  constructor(@InjectRepository(Expense) private readonly repo: Repository<Expense>) {}

  async execute(dto: CreateExpenseRequest, createdBy: string) {
    const expense = this.repo.create({ ...dto, date: new Date(dto.date) as any, createdBy });
    return this.repo.save(expense);
  }
}