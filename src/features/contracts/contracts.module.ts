import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { ContractsController } from './contracts.controller';
import { CreateContractHandler } from './commands/create/handler';
import { UpdateContractHandler } from './commands/update/handler';
import { DeleteContractHandler } from './commands/delete/handler';
import { GetOneContractHandler } from './queries/get-one/handler';
import { GetAllContractsHandler } from './queries/get-all/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  controllers: [ContractsController],
  providers: [CreateContractHandler, UpdateContractHandler, DeleteContractHandler, GetOneContractHandler, GetAllContractsHandler],
  exports: [TypeOrmModule],
})
export class ContractsModule {}