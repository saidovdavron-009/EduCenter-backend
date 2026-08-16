import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SuperAdminGuard } from '../../common/guards/super-admin.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { CreateAdminHandler } from './commands/create/handler';
import { UpdateAdminHandler } from './commands/update/handler';
import { DeleteAdminHandler } from './commands/delete/handler';
import { GetAllAdminsHandler } from './queries/get-all/handler';
import { CreateAdminRequest } from './commands/create/request';
import { UpdateAdminRequest } from './commands/update/request';

// Only the single seeded super admin may reach any of these routes — regular
// admins can't see or manage other admin accounts (privilege-escalation guard).
@ApiTags('Admins')
@ApiBearerAuth()
@Controller('admins')
@UseGuards(JwtAuthGuard, RolesGuard, SuperAdminGuard)
@Roles(UserRole.ADMIN)
export class AdminsController {
  constructor(
    private readonly createHandler: CreateAdminHandler,
    private readonly updateHandler: UpdateAdminHandler,
    private readonly deleteHandler: DeleteAdminHandler,
    private readonly getAllHandler: GetAllAdminsHandler,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Barcha adminlar ro\'yxati (faqat superadmin)' })
  getAll() {
    return this.getAllHandler.execute();
  }

  @Post()
  @ApiOperation({ summary: 'Yangi admin yaratish (faqat superadmin)' })
  create(@Body() dto: CreateAdminRequest) {
    return this.createHandler.execute(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Adminni yangilash (faqat superadmin)' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAdminRequest, @CurrentUser() user: RequestUser) {
    return this.updateHandler.execute(id, dto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Adminni o\'chirish (faqat superadmin)' })
  delete(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: RequestUser) {
    return this.deleteHandler.execute(id, user.id);
  }
}
