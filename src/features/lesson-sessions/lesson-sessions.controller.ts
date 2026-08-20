import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { GenerateLessonSessionsHandler } from './commands/generate/handler';
import { MarkLessonTeacherHandler } from './commands/mark-teacher/handler';
import { AssignSubstituteTeacherHandler } from './commands/assign-substitute/handler';
import { CancelLessonSessionHandler } from './commands/cancel/handler';
import { GetAllLessonSessionsHandler } from './queries/get-all/handler';
import { GetOneLessonSessionHandler } from './queries/get-one/handler';
import { GetTodayLessonSessionsHandler } from './queries/get-today/handler';
import { GenerateLessonSessionsRequest } from './commands/generate/request';
import { MarkLessonTeacherRequest } from './commands/mark-teacher/request';
import { AssignSubstituteTeacherRequest } from './commands/assign-substitute/request';
import { GetAllLessonSessionsRequest } from './queries/get-all/request';
import { GetTodayLessonSessionsRequest } from './queries/get-today/request';

@ApiTags('Lesson Sessions')
@ApiBearerAuth()
@Controller('lesson-sessions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class LessonSessionsController {
  constructor(
    private readonly generateHandler: GenerateLessonSessionsHandler,
    private readonly markTeacherHandler: MarkLessonTeacherHandler,
    private readonly assignSubstituteHandler: AssignSubstituteTeacherHandler,
    private readonly cancelHandler: CancelLessonSessionHandler,
    private readonly getAllHandler: GetAllLessonSessionsHandler,
    private readonly getOneHandler: GetOneLessonSessionHandler,
    private readonly getTodayHandler: GetTodayLessonSessionsHandler,
  ) {}

  @Post('generate')
  @ApiOperation({ summary: "Davr uchun dars sessiyalarini guruh jadvali asosida generatsiya qilish" })
  generate(@Body() dto: GenerateLessonSessionsRequest) {
    return this.generateHandler.execute(dto);
  }

  @Get('today')
  @ApiOperation({ summary: "\"Bugungi darslar\" — faqat davom etayotgan yoki tugagan darslar (hali boshlanmaganlar chiqmaydi)" })
  getToday(@Query() query: GetTodayLessonSessionsRequest) {
    return this.getTodayHandler.execute(query);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha dars sessiyalari' })
  getAll(@Query() query: GetAllLessonSessionsRequest) {
    return this.getAllHandler.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Dars sessiyasi' })
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getOneHandler.execute(id);
  }

  @Patch(':id/mark-teacher')
  @ApiOperation({ summary: '"Davomat qilish" — darsni yakunlash, faqat dars vaqti ichida' })
  markTeacher(@Param('id', ParseUUIDPipe) id: string, @Body() dto: MarkLessonTeacherRequest, @CurrentUser() user: RequestUser) {
    return this.markTeacherHandler.execute(id, dto, user);
  }

  @Patch(':id/substitute')
  @ApiOperation({ summary: '"O\'qituvchini almashtirish" — faqat shu dars uchun, dars tugashiga qadar' })
  assignSubstitute(@Param('id', ParseUUIDPipe) id: string, @Body() dto: AssignSubstituteTeacherRequest, @CurrentUser() user: RequestUser) {
    return this.assignSubstituteHandler.execute(id, dto, user.id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: "Dars sessiyasini bekor qilish" })
  cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.cancelHandler.execute(id);
  }
}
