import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/types';
import { CreateSubjectHandler } from './commands/create/handler';
import { UpdateSubjectHandler } from './commands/update/handler';
import { DeleteSubjectHandler } from './commands/delete/handler';
import { GetAllSubjectsHandler } from './queries/get-all/handler';
import { CreateSubjectRequest } from './commands/create/request';
import { UpdateSubjectRequest } from './commands/update/request';
import { GetAllSubjectsRequest } from './queries/get-all/request';

@ApiTags('Subjects')
@ApiBearerAuth()
@Controller('subjects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubjectsController {
  constructor(
    private readonly createHandler: CreateSubjectHandler,
    private readonly updateHandler: UpdateSubjectHandler,
    private readonly deleteHandler: DeleteSubjectHandler,
    private readonly getAllHandler: GetAllSubjectsHandler,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Barcha fanlar' })
  getAll(@Query() query: GetAllSubjectsRequest) { return this.getAllHandler.execute(query); }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Fan yaratish' })
  create(@Body() dto: CreateSubjectRequest) { return this.createHandler.execute(dto); }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Fanni yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateSubjectRequest) {
    return this.updateHandler.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Fanni o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }
}