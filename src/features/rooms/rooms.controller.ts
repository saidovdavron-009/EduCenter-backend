import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/types';
import { CreateRoomHandler } from './commands/create/handler';
import { UpdateRoomHandler } from './commands/update/handler';
import { DeleteRoomHandler } from './commands/delete/handler';
import { GetOneRoomHandler } from './queries/get-one/handler';
import { GetAllRoomsHandler } from './queries/get-all/handler';
import { CreateRoomRequest } from './commands/create/request';
import { UpdateRoomRequest } from './commands/update/request';
import { GetAllRoomsRequest } from './queries/get-all/request';

@ApiTags('Rooms')
@ApiBearerAuth()
@Controller('rooms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoomsController {
  constructor(
    private readonly createHandler: CreateRoomHandler,
    private readonly updateHandler: UpdateRoomHandler,
    private readonly deleteHandler: DeleteRoomHandler,
    private readonly getOneHandler: GetOneRoomHandler,
    private readonly getAllHandler: GetAllRoomsHandler,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi xona yaratish' })
  create(@Body() dto: CreateRoomRequest) { return this.createHandler.execute(dto); }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Xonalar ro\'yxati' })
  getAll(@Query() query: GetAllRoomsRequest) { return this.getAllHandler.execute(query); }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Xona ma\'lumotlari' })
  getOne(@Param('id', ParseUUIDPipe) id: string) { return this.getOneHandler.execute(id); }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Xonani yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateRoomRequest) { return this.updateHandler.execute(id, dto); }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xonani o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }
}