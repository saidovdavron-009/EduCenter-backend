import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, RequestUser } from '../../common/types';
import { SendNotificationHandler } from './commands/send/handler';
import { SendBulkNotificationHandler } from './commands/send-bulk/handler';
import { MarkReadHandler } from './commands/mark-read/handler';
import { MarkAllReadHandler } from './commands/mark-all-read/handler';
import { GetAllNotificationsHandler } from './queries/get-all/handler';
import { SendNotificationRequest } from './commands/send/request';
import { SendBulkNotificationRequest } from './commands/send-bulk/request';
import { GetAllNotificationsRequest } from './queries/get-all/request';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(
    private readonly sendHandler: SendNotificationHandler,
    private readonly sendBulkHandler: SendBulkNotificationHandler,
    private readonly markReadHandler: MarkReadHandler,
    private readonly markAllReadHandler: MarkAllReadHandler,
    private readonly getAllHandler: GetAllNotificationsHandler,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Mening xabarlarim' })
  getAll(@CurrentUser() user: RequestUser, @Query() query: GetAllNotificationsRequest) {
    return this.getAllHandler.execute(user.id, query);
  }

  @Patch(':id/read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xabarni o\'qilgan deb belgilash' })
  markRead(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: RequestUser) {
    return this.markReadHandler.execute(id, user.id);
  }

  @Patch('read-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Barcha xabarlarni o\'qilgan deb belgilash' })
  markAllRead(@CurrentUser() user: RequestUser) {
    return this.markAllReadHandler.execute(user.id);
  }

  @Post('send')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Xabar yuborish' })
  send(@Body() dto: SendNotificationRequest) { return this.sendHandler.execute(dto); }

  @Post('send-bulk')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Ommaviy xabar yuborish' })
  sendBulk(@Body() dto: SendBulkNotificationRequest) { return this.sendBulkHandler.execute(dto); }
}