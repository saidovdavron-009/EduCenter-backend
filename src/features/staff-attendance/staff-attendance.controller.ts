import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { CreateStaffAttendanceHandler } from './commands/create/handler';
import { UpdateStaffAttendanceHandler } from './commands/update/handler';
import { DeleteStaffAttendanceHandler } from './commands/delete/handler';
import { GetAllStaffAttendanceHandler } from './queries/get-all/handler';
import { GetOneStaffAttendanceHandler } from './queries/get-one/handler';
import { CreateStaffAttendanceRequest } from './commands/create/request';
import { UpdateStaffAttendanceRequest } from './commands/update/request';
import { GetAllStaffAttendanceRequest } from './queries/get-all/request';

@ApiTags('Staff Attendance')
@ApiBearerAuth()
@Controller('staff-attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class StaffAttendanceController {
  constructor(
    private readonly createHandler: CreateStaffAttendanceHandler,
    private readonly updateHandler: UpdateStaffAttendanceHandler,
    private readonly deleteHandler: DeleteStaffAttendanceHandler,
    private readonly getAllHandler: GetAllStaffAttendanceHandler,
    private readonly getOneHandler: GetOneStaffAttendanceHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Xodim (o\'qituvchi bo\'lmagan) davomati qo\'shish' })
  create(@Body() dto: CreateStaffAttendanceRequest, @CurrentUser() user: RequestUser) {
    return this.createHandler.execute(dto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha xodim davomatlari' })
  getAll(@Query() query: GetAllStaffAttendanceRequest) {
    return this.getAllHandler.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xodim davomati' })
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getOneHandler.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Xodim davomatini yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateStaffAttendanceRequest, @CurrentUser() user: RequestUser) {
    return this.updateHandler.execute(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xodim davomatini o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteHandler.execute(id);
  }
}
