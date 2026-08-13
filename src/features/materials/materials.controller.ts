import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { CreateMaterialHandler } from './commands/create/handler';
import { UpdateMaterialHandler } from './commands/update/handler';
import { DeleteMaterialHandler } from './commands/delete/handler';
import { GetAllMaterialsHandler } from './queries/get-all/handler';
import { CreateMaterialRequest } from './commands/create/request';
import { UpdateMaterialRequest } from './commands/update/request';
import { GetAllMaterialsRequest } from './queries/get-all/request';

@ApiTags('Materials')
@ApiBearerAuth()
@Controller('materials')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MaterialsController {
  constructor(
    private readonly createHandler: CreateMaterialHandler,
    private readonly updateHandler: UpdateMaterialHandler,
    private readonly deleteHandler: DeleteMaterialHandler,
    private readonly getAllHandler: GetAllMaterialsHandler,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Barcha materiallar' })
  getAll(@Query() query: GetAllMaterialsRequest) { return this.getAllHandler.execute(query); }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Material qo\'shish' })
  create(@Body() dto: CreateMaterialRequest, @CurrentUser() user: RequestUser) {
    return this.createHandler.execute(dto, user.id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Materialni yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateMaterialRequest) {
    return this.updateHandler.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Materialni o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }
}