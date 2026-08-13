import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { CreateLeadHandler } from './commands/create-lead/handler';
import { UpdateLeadHandler } from './commands/update-lead/handler';
import { DeleteLeadHandler } from './commands/delete-lead/handler';
import { ConvertLeadHandler } from './commands/convert-lead/handler';
import { AddCallLogHandler } from './commands/add-call-log/handler';
import { CreateLeadSourceHandler } from './commands/create-source/handler';
import { GetAllLeadsHandler } from './queries/get-all-leads/handler';
import { GetOneLeadHandler } from './queries/get-one-lead/handler';
import { GetLeadSourcesHandler } from './queries/get-sources/handler';
import { CreateLeadRequest } from './commands/create-lead/request';
import { UpdateLeadRequest } from './commands/update-lead/request';
import { ConvertLeadRequest } from './commands/convert-lead/request';
import { AddCallLogRequest } from './commands/add-call-log/request';
import { CreateLeadSourceRequest } from './commands/create-source/request';
import { GetAllLeadsRequest } from './queries/get-all-leads/request';

@ApiTags('Leads (CRM)')
@ApiBearerAuth()
@Controller('leads')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeadsController {
  constructor(
    private readonly createLeadHandler: CreateLeadHandler,
    private readonly updateLeadHandler: UpdateLeadHandler,
    private readonly deleteLeadHandler: DeleteLeadHandler,
    private readonly convertLeadHandler: ConvertLeadHandler,
    private readonly addCallLogHandler: AddCallLogHandler,
    private readonly createSourceHandler: CreateLeadSourceHandler,
    private readonly getAllLeadsHandler: GetAllLeadsHandler,
    private readonly getOneLeadHandler: GetOneLeadHandler,
    private readonly getSourcesHandler: GetLeadSourcesHandler,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi lead qo\'shish' })
  createLead(@Body() dto: CreateLeadRequest) { return this.createLeadHandler.execute(dto); }

  @Post('sources')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Lead manbai qo\'shish' })
  createSource(@Body() dto: CreateLeadSourceRequest) { return this.createSourceHandler.execute(dto); }

  @Post(':id/call-log')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Qo\'ng\'iroq jurnali qo\'shish' })
  addCallLog(@Param('id', ParseUUIDPipe) id: string, @Body() dto: AddCallLogRequest, @CurrentUser() user: RequestUser) {
    return this.addCallLogHandler.execute({ ...dto, leadId: id }, user);
  }

  @Patch(':id/convert')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Leadni o\'quvchiga aylantirish' })
  convert(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ConvertLeadRequest) { return this.convertLeadHandler.execute(id, dto); }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Leadlar ro\'yxati' })
  getAll(@Query() query: GetAllLeadsRequest) { return this.getAllLeadsHandler.execute(query); }

  @Get('sources')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Lead manbalari ro\'yxati' })
  getSources() { return this.getSourcesHandler.execute(); }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Lead ma\'lumotlari (call logs bilan)' })
  getOne(@Param('id', ParseUUIDPipe) id: string) { return this.getOneLeadHandler.execute(id); }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Leadni yangilash' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateLeadRequest) { return this.updateLeadHandler.execute(id, dto); }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Leadni o\'chirish' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.deleteLeadHandler.execute(id); }
}