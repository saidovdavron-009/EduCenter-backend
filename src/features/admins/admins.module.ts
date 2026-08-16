import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { AdminsController } from './admins.controller';
import { CreateAdminHandler } from './commands/create/handler';
import { UpdateAdminHandler } from './commands/update/handler';
import { DeleteAdminHandler } from './commands/delete/handler';
import { GetAllAdminsHandler } from './queries/get-all/handler';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminsController],
  providers: [CreateAdminHandler, UpdateAdminHandler, DeleteAdminHandler, GetAllAdminsHandler],
})
export class AdminsModule {}
