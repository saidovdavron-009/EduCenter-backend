import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/types';
import { CreateStaffSalaryHandler } from './commands/create/handler';
import { UpdateStaffSalaryHandler } from './commands/update/handler';
import { DeleteStaffSalaryHandler } from './commands/delete/handler';
import { PayStaffSalaryHandler } from './commands/pay/handler';
import { GetAllStaffSalariesHandler } from './queries/get-all/handler';
import { GetOneStaffSalaryHandler } from './queries/get-one/handler';
import { GetStaffSalaryEmployeesHandler } from './queries/get-employees/handler';
import { CreateStaffSalaryRequest } from './commands/create/request';
import { UpdateStaffSalaryRequest } from './commands/update/request';
import { PayStaffSalaryRequest } from './commands/pay/request';
import { GetAllStaffSalariesRequest } from './queries/get-all/request';

@ApiTags('Staff Salaries')
@ApiBearerAuth()
@Controller('staff-salaries')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class StaffSalariesController {
  constructor(
    private readonly createHandler: CreateStaffSalaryHandler,
    private readonly updateHandler: UpdateStaffSalaryHandler,
    private readonly deleteHandler: DeleteStaffSalaryHandler,
    private readonly payHandler: PayStaffSalaryHandler,
    private readonly getAllHandler: GetAllStaffSalariesHandler,
    private readonly getOneHandler: GetOneStaffSalaryHandler,
    private readonly getEmployeesHandler: GetStaffSalaryEmployeesHandler,
  ) {}

  @Get('employees')
  @ApiOperation({ summary: 'Maosh belgilash mumkin bo\'lgan xodimlar (o\'qituvchi + admin)' })
  getEmployees() {
    return this.getEmployeesHandler.execute();
  }

  @Post()
  @ApiOperation({ summary: 'Xodim maoshi yozuvi yaratish' })
  create(@Body() dto: CreateStaffSalaryRequest) {
    return this.createHandler.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha maosh yozuvlari' })
  getAll(@Query() query: GetAllStaffSalariesRequest) {
    return this.getAllHandler.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Maosh yozuvi' })
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getOneHandler.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Maosh yozuvini yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateStaffSalaryRequest) {
    return this.updateHandler.execute(id, dto);
  }

  @Patch(':id/pay')
  @ApiOperation({ summary: 'Maosh to\'lash' })
  pay(@Param('id', ParseUUIDPipe) id: string, @Body() dto: PayStaffSalaryRequest) {
    return this.payHandler.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Maosh yozuvini o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteHandler.execute(id);
  }
}
