import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { CreateTaskHandler } from './commands/create/handler';
import { UpdateTaskHandler } from './commands/update/handler';
import { DeleteTaskHandler } from './commands/delete/handler';
import { GetOneTaskHandler } from './queries/get-one/handler';
import { GetAllTasksHandler } from './queries/get-all/handler';
import { CreateTaskRequest } from './commands/create/request';
import { UpdateTaskRequest } from './commands/update/request';
import { GetAllTasksRequest } from './queries/get-all/request';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(
    private readonly createHandler: CreateTaskHandler,
    private readonly updateHandler: UpdateTaskHandler,
    private readonly deleteHandler: DeleteTaskHandler,
    private readonly getOneHandler: GetOneTaskHandler,
    private readonly getAllHandler: GetAllTasksHandler,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi vazifa yaratish' })
  create(@Body() dto: CreateTaskRequest, @CurrentUser() user: RequestUser) { return this.createHandler.execute(dto, user); }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Vazifalar ro\'yxati' })
  getAll(@Query() query: GetAllTasksRequest) { return this.getAllHandler.execute(query); }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Vazifa ma\'lumotlari' })
  getOne(@Param('id', ParseUUIDPipe) id: string) { return this.getOneHandler.execute(id); }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Vazifani yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTaskRequest) { return this.updateHandler.execute(id, dto); }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Vazifani o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }
}
