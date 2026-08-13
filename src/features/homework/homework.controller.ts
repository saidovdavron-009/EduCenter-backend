import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { CreateHomeworkHandler } from './commands/create/handler';
import { UpdateHomeworkHandler } from './commands/update/handler';
import { DeleteHomeworkHandler } from './commands/delete/handler';
import { SubmitHomeworkHandler } from './commands/submit/handler';
import { GradeSubmissionHandler } from './commands/grade-submission/handler';
import { GetAllHomeworkHandler } from './queries/get-all/handler';
import { GetOneHomeworkHandler } from './queries/get-one/handler';
import { CreateHomeworkRequest } from './commands/create/request';
import { UpdateHomeworkRequest } from './commands/update/request';
import { SubmitHomeworkRequest } from './commands/submit/request';
import { GradeSubmissionRequest } from './commands/grade-submission/request';
import { GetAllHomeworkRequest } from './queries/get-all/request';

@ApiTags('Homework')
@ApiBearerAuth()
@Controller('homework')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HomeworkController {
  constructor(
    private readonly createHandler: CreateHomeworkHandler,
    private readonly updateHandler: UpdateHomeworkHandler,
    private readonly deleteHandler: DeleteHomeworkHandler,
    private readonly submitHandler: SubmitHomeworkHandler,
    private readonly gradeHandler: GradeSubmissionHandler,
    private readonly getAllHandler: GetAllHomeworkHandler,
    private readonly getOneHandler: GetOneHomeworkHandler,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Barcha uy vazifalari' })
  getAll(@Query() query: GetAllHomeworkRequest) { return this.getAllHandler.execute(query); }

  @Get(':id')
  @ApiOperation({ summary: 'Uy vazifasi va topshiriqlar' })
  getOne(@Param('id', ParseUUIDPipe) id: string) { return this.getOneHandler.execute(id); }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Uy vazifasi berish' })
  create(@Body() dto: CreateHomeworkRequest, @CurrentUser() user: RequestUser) {
    return this.createHandler.execute(dto, user.id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Uy vazifasini yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateHomeworkRequest) {
    return this.updateHandler.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Uy vazifasini o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }

  @Post(':id/submit')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Uy vazifasini topshirish (o\'quvchi)' })
  submit(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SubmitHomeworkRequest, @CurrentUser() user: RequestUser) {
    return this.submitHandler.execute({ ...dto, homeworkId: id }, user.id);
  }

  @Patch(':id/submissions/:submissionId')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Topshiriqni baholash' })
  gradeSubmission(
    @Param('submissionId', ParseUUIDPipe) submissionId: string,
    @Body() dto: GradeSubmissionRequest,
  ) {
    return this.gradeHandler.execute({ ...dto, submissionId });
  }
}