import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { CreateExpenseHandler } from './commands/create/handler';
import { UpdateExpenseHandler } from './commands/update/handler';
import { DeleteExpenseHandler } from './commands/delete/handler';
import { GetAllExpensesHandler } from './queries/get-all/handler';
import { CreateExpenseRequest } from './commands/create/request';
import { UpdateExpenseRequest } from './commands/update/request';
import { GetAllExpensesRequest } from './queries/get-all/request';

@ApiTags('Expenses')
@ApiBearerAuth()
@Controller('expenses')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class ExpensesController {
  constructor(
    private readonly createHandler: CreateExpenseHandler,
    private readonly updateHandler: UpdateExpenseHandler,
    private readonly deleteHandler: DeleteExpenseHandler,
    private readonly getAllHandler: GetAllExpensesHandler,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Barcha xarajatlar' })
  getAll(@Query() query: GetAllExpensesRequest) { return this.getAllHandler.execute(query); }

  @Post()
  @ApiOperation({ summary: 'Xarajat qo\'shish' })
  create(@Body() dto: CreateExpenseRequest, @CurrentUser() user: RequestUser) {
    return this.createHandler.execute(dto, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Xarajatni yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateExpenseRequest) {
    return this.updateHandler.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xarajatni o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }
}