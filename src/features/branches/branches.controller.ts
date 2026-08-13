import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/types';
import { CreateBranchHandler } from './commands/create/handler';
import { UpdateBranchHandler } from './commands/update/handler';
import { DeleteBranchHandler } from './commands/delete/handler';
import { GetOneBranchHandler } from './queries/get-one/handler';
import { GetAllBranchesHandler } from './queries/get-all/handler';
import { CreateBranchRequest } from './commands/create/request';
import { UpdateBranchRequest } from './commands/update/request';
import { GetAllBranchesRequest } from './queries/get-all/request';

@ApiTags('Branches')
@ApiBearerAuth()
@Controller('branches')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BranchesController {
  constructor(
    private readonly createHandler: CreateBranchHandler,
    private readonly updateHandler: UpdateBranchHandler,
    private readonly deleteHandler: DeleteBranchHandler,
    private readonly getOneHandler: GetOneBranchHandler,
    private readonly getAllHandler: GetAllBranchesHandler,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi filial yaratish' })
  create(@Body() dto: CreateBranchRequest) {
    return this.createHandler.execute(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Barcha filiallar ro\'yxati' })
  getAll(@Query() query: GetAllBranchesRequest) {
    return this.getAllHandler.execute(query);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Filial ma\'lumotlari' })
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getOneHandler.execute(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Filialni yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateBranchRequest) {
    return this.updateHandler.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Filialni o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteHandler.execute(id);
  }
}