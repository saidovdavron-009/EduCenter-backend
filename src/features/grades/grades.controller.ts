import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { CreateGradeHandler } from './commands/create/handler';
import { UpdateGradeHandler } from './commands/update/handler';
import { DeleteGradeHandler } from './commands/delete/handler';
import { GetAllGradesHandler } from './queries/get-all/handler';
import { GetGradesByGroupHandler } from './queries/get-by-group/handler';
import { CreateGradeRequest } from './commands/create/request';
import { UpdateGradeRequest } from './commands/update/request';
import { GetAllGradesRequest } from './queries/get-all/request';

@ApiTags('Grades')
@ApiBearerAuth()
@Controller('grades')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GradesController {
  constructor(
    private readonly createHandler: CreateGradeHandler,
    private readonly updateHandler: UpdateGradeHandler,
    private readonly deleteHandler: DeleteGradeHandler,
    private readonly getAllHandler: GetAllGradesHandler,
    private readonly getByGroupHandler: GetGradesByGroupHandler,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Barcha baholar' })
  getAll(@Query() query: GetAllGradesRequest) { return this.getAllHandler.execute(query); }

  @Get('group/:groupId')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Guruh bo\'yicha baholar' })
  getByGroup(@Param('groupId', ParseUUIDPipe) groupId: string, @Query() query: any) {
    return this.getByGroupHandler.execute({ ...query, groupId });
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Baho qo\'yish' })
  create(@Body() dto: CreateGradeRequest, @CurrentUser() user: RequestUser) {
    return this.createHandler.execute(dto, user.id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Bahoni yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateGradeRequest) {
    return this.updateHandler.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Bahoni o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }
}