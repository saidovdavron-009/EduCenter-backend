import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/types';
import { CreateContractHandler } from './commands/create/handler';
import { UpdateContractHandler } from './commands/update/handler';
import { DeleteContractHandler } from './commands/delete/handler';
import { GetOneContractHandler } from './queries/get-one/handler';
import { GetAllContractsHandler } from './queries/get-all/handler';
import { CreateContractRequest } from './commands/create/request';
import { UpdateContractRequest } from './commands/update/request';
import { GetAllContractsRequest } from './queries/get-all/request';

@ApiTags('Contracts')
@ApiBearerAuth()
@Controller('contracts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContractsController {
  constructor(
    private readonly createHandler: CreateContractHandler,
    private readonly updateHandler: UpdateContractHandler,
    private readonly deleteHandler: DeleteContractHandler,
    private readonly getOneHandler: GetOneContractHandler,
    private readonly getAllHandler: GetAllContractsHandler,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi shartnoma yaratish' })
  create(@Body() dto: CreateContractRequest) { return this.createHandler.execute(dto); }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Shartnomalar ro\'yxati' })
  getAll(@Query() query: GetAllContractsRequest) { return this.getAllHandler.execute(query); }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Shartnoma ma\'lumotlari' })
  getOne(@Param('id', ParseUUIDPipe) id: string) { return this.getOneHandler.execute(id); }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Shartnomani yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateContractRequest) { return this.updateHandler.execute(id, dto); }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Shartnomani o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }
}