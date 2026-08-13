import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { CreateQuizHandler } from './commands/create-quiz/handler';
import { UpdateQuizHandler } from './commands/update-quiz/handler';
import { DeleteQuizHandler } from './commands/delete-quiz/handler';
import { PublishQuizHandler } from './commands/publish-quiz/handler';
import { AddQuestionHandler } from './commands/add-question/handler';
import { UpdateQuestionHandler } from './commands/update-question/handler';
import { DeleteQuestionHandler } from './commands/delete-question/handler';
import { SubmitQuizHandler } from './commands/submit-quiz/handler';
import { GetAllQuizzesHandler } from './queries/get-all-quizzes/handler';
import { GetOneQuizHandler } from './queries/get-one-quiz/handler';
import { GetQuizResultsHandler } from './queries/get-results/handler';
import { CreateQuizRequest } from './commands/create-quiz/request';
import { UpdateQuizRequest } from './commands/update-quiz/request';
import { AddQuestionRequest } from './commands/add-question/request';
import { UpdateQuestionRequest } from './commands/update-question/request';
import { SubmitQuizRequest } from './commands/submit-quiz/request';
import { GetAllQuizzesRequest } from './queries/get-all-quizzes/request';
import { GetQuizResultsRequest } from './queries/get-results/request';

@ApiTags('Quizzes')
@ApiBearerAuth()
@Controller('quizzes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuizzesController {
  constructor(
    private readonly createHandler: CreateQuizHandler,
    private readonly updateHandler: UpdateQuizHandler,
    private readonly deleteHandler: DeleteQuizHandler,
    private readonly publishHandler: PublishQuizHandler,
    private readonly addQuestionHandler: AddQuestionHandler,
    private readonly updateQuestionHandler: UpdateQuestionHandler,
    private readonly deleteQuestionHandler: DeleteQuestionHandler,
    private readonly submitHandler: SubmitQuizHandler,
    private readonly getAllHandler: GetAllQuizzesHandler,
    private readonly getOneHandler: GetOneQuizHandler,
    private readonly getResultsHandler: GetQuizResultsHandler,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Yangi quiz yaratish' })
  create(@Body() dto: CreateQuizRequest) { return this.createHandler.execute(dto); }

  @Post(':id/questions')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Quizga savol qo\'shish' })
  addQuestion(@Param('id', ParseUUIDPipe) id: string, @Body() dto: AddQuestionRequest) { return this.addQuestionHandler.execute(id, dto); }

  @Patch(':id/questions/:questionId')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Quiz savolini yangilash' })
  updateQuestion(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('questionId', ParseUUIDPipe) questionId: string,
    @Body() dto: UpdateQuestionRequest,
  ) {
    return this.updateQuestionHandler.execute(id, questionId, dto);
  }

  @Delete(':id/questions/:questionId')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Quiz savolini o\'chirish' })
  deleteQuestion(@Param('id', ParseUUIDPipe) id: string, @Param('questionId', ParseUUIDPipe) questionId: string) {
    return this.deleteQuestionHandler.execute(id, questionId);
  }

  @Post(':id/submit')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Quiz javoblarini topshirish' })
  submit(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SubmitQuizRequest, @CurrentUser() user: RequestUser) {
    return this.submitHandler.execute(id, dto, user);
  }

  @Patch(':id/publish')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Quizni nashr qilish' })
  publish(@Param('id', ParseUUIDPipe) id: string) { return this.publishHandler.execute(id); }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT)
  @ApiOperation({ summary: 'Quizlar ro\'yxati' })
  getAll(@Query() query: GetAllQuizzesRequest) { return this.getAllHandler.execute(query); }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT)
  @ApiOperation({ summary: 'Quiz (savollar va variantlar bilan)' })
  getOne(@Param('id', ParseUUIDPipe) id: string) { return this.getOneHandler.execute(id); }

  @Get(':id/results')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Quiz natijalari' })
  getResults(@Param('id', ParseUUIDPipe) id: string, @Query() query: GetQuizResultsRequest) { return this.getResultsHandler.execute(id, query); }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Quizni yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateQuizRequest) { return this.updateHandler.execute(id, dto); }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Quizni o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }
}