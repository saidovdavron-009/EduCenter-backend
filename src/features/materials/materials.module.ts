import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { MaterialsController } from './materials.controller';
import { CreateMaterialHandler } from './commands/create/handler';
import { UpdateMaterialHandler } from './commands/update/handler';
import { DeleteMaterialHandler } from './commands/delete/handler';
import { GetAllMaterialsHandler } from './queries/get-all/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Material, Teacher])],
  controllers: [MaterialsController],
  providers: [CreateMaterialHandler, UpdateMaterialHandler, DeleteMaterialHandler, GetAllMaterialsHandler],
  exports: [TypeOrmModule],
})
export class MaterialsModule {}