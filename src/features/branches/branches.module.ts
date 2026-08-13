import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { BranchesController } from './branches.controller';
import { CreateBranchHandler } from './commands/create/handler';
import { UpdateBranchHandler } from './commands/update/handler';
import { DeleteBranchHandler } from './commands/delete/handler';
import { GetOneBranchHandler } from './queries/get-one/handler';
import { GetAllBranchesHandler } from './queries/get-all/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  controllers: [BranchesController],
  providers: [CreateBranchHandler, UpdateBranchHandler, DeleteBranchHandler, GetOneBranchHandler, GetAllBranchesHandler],
  exports: [TypeOrmModule],
})
export class BranchesModule {}