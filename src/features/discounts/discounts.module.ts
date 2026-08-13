import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { DiscountsController } from './discounts.controller';
import { CreateDiscountHandler } from './commands/create/handler';
import { UpdateDiscountHandler } from './commands/update/handler';
import { DeleteDiscountHandler } from './commands/delete/handler';
import { GetAllDiscountsHandler } from './queries/get-all/handler';
import { GetOneDiscountHandler } from './queries/get-one/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Discount])],
  controllers: [DiscountsController],
  providers: [CreateDiscountHandler, UpdateDiscountHandler, DeleteDiscountHandler, GetAllDiscountsHandler, GetOneDiscountHandler],
  exports: [TypeOrmModule],
})
export class DiscountsModule {}
