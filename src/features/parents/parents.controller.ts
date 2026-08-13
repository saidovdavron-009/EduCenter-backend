import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { Parent } from './entities/parent.entity';
import { CreateParentHandler } from './commands/create/handler';
import { UpdateParentHandler } from './commands/update/handler';
import { DeleteParentHandler } from './commands/delete/handler';
import { LinkStudentHandler } from './commands/link-student/handler';
import { UnlinkStudentHandler } from './commands/unlink-student/handler';
import { GetOneParentHandler } from './queries/get-one/handler';
import { GetAllParentsHandler } from './queries/get-all/handler';
import { CreateParentRequest } from './commands/create/request';
import { UpdateParentRequest } from './commands/update/request';
import { LinkStudentRequest } from './commands/link-student/request';
import { UnlinkStudentRequest } from './commands/unlink-student/request';
import { GetAllParentsRequest } from './queries/get-all/request';

@ApiTags('Parents')
@ApiBearerAuth()
@Controller('parents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ParentsController {
  constructor(
    private readonly createHandler: CreateParentHandler,
    private readonly updateHandler: UpdateParentHandler,
    private readonly deleteHandler: DeleteParentHandler,
    private readonly linkStudentHandler: LinkStudentHandler,
    private readonly unlinkStudentHandler: UnlinkStudentHandler,
    private readonly getOneHandler: GetOneParentHandler,
    private readonly getAllHandler: GetAllParentsHandler,
    @InjectRepository(Parent) private readonly parentRepo: Repository<Parent>,
  ) {}

  private async assertSelf(id: string, user: RequestUser) {
    if (user.role === UserRole.ADMIN) return;
    const own = await this.parentRepo.findOne({ where: { userId: user.id } });
    if (!own || own.id !== id) throw new ForbiddenException('Ruxsat yo\'q');
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi ota-ona yaratish' })
  create(@Body() dto: CreateParentRequest) { return this.createHandler.execute(dto); }

  @Post('link-student')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'O\'quvchini ota-onaga bog\'lash' })
  linkStudent(@Body() dto: LinkStudentRequest) { return this.linkStudentHandler.execute(dto); }

  @Delete('unlink-student')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'O\'quvchini ota-onadan ajratish' })
  unlinkStudent(@Body() dto: UnlinkStudentRequest) { return this.unlinkStudentHandler.execute(dto); }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Ota-onalar ro\'yxati' })
  getAll(@Query() query: GetAllParentsRequest) { return this.getAllHandler.execute(query); }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PARENT)
  @ApiOperation({ summary: 'Ota-ona ma\'lumotlari' })
  async getOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: RequestUser) {
    await this.assertSelf(id, user);
    return this.getOneHandler.execute(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.PARENT)
  @ApiOperation({ summary: 'Ota-ona ma\'lumotlarini yangilash' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateParentRequest, @CurrentUser() user: RequestUser) {
    await this.assertSelf(id, user);
    return this.updateHandler.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Ota-onani o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteHandler.execute(id); }
}