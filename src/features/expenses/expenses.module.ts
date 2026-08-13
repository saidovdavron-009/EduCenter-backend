import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { ExpensesController } from './expenses.controller';
import { CreateExpenseHandler } from './commands/create/handler';
import { UpdateExpenseHandler } from './commands/update/handler';
import { DeleteExpenseHandler } from './commands/delete/handler';
import { GetAllExpensesHandler } from './queries/get-all/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  controllers: [ExpensesController],
  providers: [CreateExpenseHandler, UpdateExpenseHandler, DeleteExpenseHandler, GetAllExpensesHandler],
  exports: [TypeOrmModule],
})
export class ExpensesModule {}