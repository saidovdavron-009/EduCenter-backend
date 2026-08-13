import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { CreateInventoryItemHandler } from './commands/create-item/handler';
import { UpdateInventoryItemHandler } from './commands/update-item/handler';
import { DeleteInventoryItemHandler } from './commands/delete-item/handler';
import { StockInHandler } from './commands/stock-in/handler';
import { StockOutHandler } from './commands/stock-out/handler';
import { SellBookHandler } from './commands/sell-book/handler';
import { GetAllInventoryItemsHandler } from './queries/get-all-items/handler';
import { GetOneInventoryItemHandler } from './queries/get-one-item/handler';
import { CreateInventoryItemRequest } from './commands/create-item/request';
import { UpdateInventoryItemRequest } from './commands/update-item/request';
import { StockInRequest } from './commands/stock-in/request';
import { StockOutRequest } from './commands/stock-out/request';
import { SellBookRequest } from './commands/sell-book/request';
import { GetAllInventoryItemsRequest } from './queries/get-all-items/request';

@ApiTags('Inventory')
@ApiBearerAuth()
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(
    private readonly createItemHandler: CreateInventoryItemHandler,
    private readonly updateItemHandler: UpdateInventoryItemHandler,
    private readonly deleteItemHandler: DeleteInventoryItemHandler,
    private readonly stockInHandler: StockInHandler,
    private readonly stockOutHandler: StockOutHandler,
    private readonly sellBookHandler: SellBookHandler,
    private readonly getAllItemsHandler: GetAllInventoryItemsHandler,
    private readonly getOneItemHandler: GetOneInventoryItemHandler,
  ) {}

  @Post('items')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi inventar mahsulot qo\'shish' })
  createItem(@Body() dto: CreateInventoryItemRequest) { return this.createItemHandler.execute(dto); }

  @Post('stock-in')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Kirim (qabul qilish)' })
  stockIn(@Body() dto: StockInRequest, @CurrentUser() user: RequestUser) { return this.stockInHandler.execute(dto, user); }

  @Post('stock-out')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Chiqim' })
  stockOut(@Body() dto: StockOutRequest, @CurrentUser() user: RequestUser) { return this.stockOutHandler.execute(dto, user); }

  @Post('sell')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'O\'quvchiga kitob/mahsulot sotish' })
  sell(@Body() dto: SellBookRequest, @CurrentUser() user: RequestUser) { return this.sellBookHandler.execute(dto, user); }

  @Get('items')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Inventar ro\'yxati' })
  getAllItems(@Query() query: GetAllInventoryItemsRequest) { return this.getAllItemsHandler.execute(query); }

  @Get('items/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Mahsulot ma\'lumotlari (loglar bilan)' })
  getOneItem(@Param('id', ParseUUIDPipe) id: string) { return this.getOneItemHandler.execute(id); }

  @Patch('items/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Mahsulotni yangilash' })
  updateItem(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateInventoryItemRequest) { return this.updateItemHandler.execute(id, dto); }

  @Delete('items/:id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mahsulotni o\'chirish' })
  deleteItem(@Param('id', ParseUUIDPipe) id: string) { return this.deleteItemHandler.execute(id); }
}