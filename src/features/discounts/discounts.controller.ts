import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/types';
import { CreateDiscountHandler } from './commands/create/handler';
import { UpdateDiscountHandler } from './commands/update/handler';
import { DeleteDiscountHandler } from './commands/delete/handler';
import { GetAllDiscountsHandler } from './queries/get-all/handler';
import { GetOneDiscountHandler } from './queries/get-one/handler';
import { CreateDiscountRequest } from './commands/create/request';
import { UpdateDiscountRequest } from './commands/update/request';
import { GetAllDiscountsRequest } from './queries/get-all/request';

@ApiTags('Discounts')
@ApiBearerAuth()
@Controller('discounts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class DiscountsController {
  constructor(
    private readonly createHandler: CreateDiscountHandler,
    private readonly updateHandler: UpdateDiscountHandler,
    private readonly deleteHandler: DeleteDiscountHandler,
    private readonly getAllHandler: GetAllDiscountsHandler,
    private readonly getOneHandler: GetOneDiscountHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Chegirma yaratish' })
  create(@Body() dto: CreateDiscountRequest) { return this.createHandler.execute(dto); }

  @Get()
  @ApiOperation({ summary: 'Barcha chegirmalar' })
  getAll(@Query() query: GetAllDiscountsRequest) { return this.getAllHandler.execute(query); }

  @Get(':id')
  @ApiOperation({ summary: 'Chegirma ma\'lumotlari' })
  getOne(@Param('id', ParseUUIDPipe) id: string) { return this.getOneHandler.execute(id); }

  @Patch(':id')
  @ApiOperation({ summary: 'Chegirmani yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateDiscountRequest) { return this.updateHandler.execute(id, dto); }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Chegirmani o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }
}
