import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomsController } from './rooms.controller';
import { CreateRoomHandler } from './commands/create/handler';
import { UpdateRoomHandler } from './commands/update/handler';
import { DeleteRoomHandler } from './commands/delete/handler';
import { GetOneRoomHandler } from './queries/get-one/handler';
import { GetAllRoomsHandler } from './queries/get-all/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomsController],
  providers: [CreateRoomHandler, UpdateRoomHandler, DeleteRoomHandler, GetOneRoomHandler, GetAllRoomsHandler],
  exports: [TypeOrmModule],
})
export class RoomsModule {}