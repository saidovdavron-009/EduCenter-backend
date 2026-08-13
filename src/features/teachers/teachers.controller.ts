import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { CreateTeacherHandler } from './commands/create/handler';
import { UpdateTeacherHandler } from './commands/update/handler';
import { DeleteTeacherHandler } from './commands/delete/handler';
import { GetOneTeacherHandler } from './queries/get-one/handler';
import { GetAllTeachersHandler } from './queries/get-all/handler';
import { CreateTeacherRequest } from './commands/create/request';
import { UpdateTeacherRequest } from './commands/update/request';
import { GetAllTeachersRequest } from './queries/get-all/request';

@ApiTags('Teachers')
@ApiBearerAuth()
@Controller('teachers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeachersController {
  constructor(
    private readonly createHandler: CreateTeacherHandler,
    private readonly updateHandler: UpdateTeacherHandler,
    private readonly deleteHandler: DeleteTeacherHandler,
    private readonly getOneHandler: GetOneTeacherHandler,
    private readonly getAllHandler: GetAllTeachersHandler,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Barcha o\'qituvchilar' })
  getAll(@Query() query: GetAllTeachersRequest) { return this.getAllHandler.execute(query); }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'O\'qituvchi ma\'lumotlari' })
  getOne(@Param('id', ParseUUIDPipe) id: string) { return this.getOneHandler.execute(id); }

  @Get(':id/groups')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'O\'qituvchi guruhlari' })
  getGroups(@Param('id', ParseUUIDPipe) id: string) {
    return this.getOneHandler.execute(id).then((t: any) => t.groups);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'O\'qituvchi yaratish' })
  create(@Body() dto: CreateTeacherRequest) { return this.createHandler.execute(dto); }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'O\'qituvchini yangilash' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTeacherRequest,
    @CurrentUser() user: RequestUser,
  ) {
    if (user.role === UserRole.TEACHER) {
      const teacher = await this.getOneHandler.execute(id);
      if (teacher.userId !== user.id) {
        throw new ForbiddenException('Faqat o\'z profilingizni tahrirlashingiz mumkin');
      }
      const allowed: Pick<UpdateTeacherRequest, 'fullName' | 'phone' | 'email'> = {};
      if (dto.fullName !== undefined) allowed.fullName = dto.fullName;
      if (dto.phone !== undefined) allowed.phone = dto.phone;
      if (dto.email !== undefined) allowed.email = dto.email;
      return this.updateHandler.execute(id, allowed);
    }
    return this.updateHandler.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'O\'qituvchini o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }
}