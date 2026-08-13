import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query,
  UseGuards, ParseUUIDPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/types';
import { CreateGroupHandler } from './commands/create/handler';
import { UpdateGroupHandler } from './commands/update/handler';
import { DeleteGroupHandler } from './commands/delete/handler';
import { AddStudentToGroupHandler } from './commands/add-student/handler';
import { RemoveStudentFromGroupHandler } from './commands/remove-student/handler';
import { GetOneGroupHandler } from './queries/get-one/handler';
import { GetAllGroupsHandler } from './queries/get-all/handler';
import { CreateGroupRequest } from './commands/create/request';
import { UpdateGroupRequest } from './commands/update/request';
import { AddStudentToGroupRequest } from './commands/add-student/request';
import { GetAllGroupsRequest } from './queries/get-all/request';

@ApiTags('Groups')
@ApiBearerAuth()
@Controller('groups')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GroupsController {
  constructor(
    private readonly createHandler: CreateGroupHandler,
    private readonly updateHandler: UpdateGroupHandler,
    private readonly deleteHandler: DeleteGroupHandler,
    private readonly addStudentHandler: AddStudentToGroupHandler,
    private readonly removeStudentHandler: RemoveStudentFromGroupHandler,
    private readonly getOneHandler: GetOneGroupHandler,
    private readonly getAllHandler: GetAllGroupsHandler,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Barcha guruhlar' })
  getAll(@Query() query: GetAllGroupsRequest) { return this.getAllHandler.execute(query); }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Guruh ma\'lumotlari' })
  getOne(@Param('id', ParseUUIDPipe) id: string) { return this.getOneHandler.execute(id); }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Guruh yaratish' })
  create(@Body() dto: CreateGroupRequest) { return this.createHandler.execute(dto); }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Guruhni yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateGroupRequest) {
    return this.updateHandler.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Guruhni yopish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }

  @Post(':id/students')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Guruhga o\'quvchi qo\'shish' })
  addStudent(@Param('id', ParseUUIDPipe) id: string, @Body() dto: AddStudentToGroupRequest) {
    return this.addStudentHandler.execute(id, dto);
  }

  @Delete(':id/students/:studentId')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Guruhdan o\'quvchini chiqarish' })
  removeStudent(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('studentId', ParseUUIDPipe) studentId: string,
  ) {
    return this.removeStudentHandler.execute(id, studentId);
  }
}
