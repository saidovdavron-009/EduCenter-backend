import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead, LeadSource, CallLog } from './entities/lead.entity';
import { LeadsController } from './leads.controller';
import { CreateLeadHandler } from './commands/create-lead/handler';
import { UpdateLeadHandler } from './commands/update-lead/handler';
import { DeleteLeadHandler } from './commands/delete-lead/handler';
import { ConvertLeadHandler } from './commands/convert-lead/handler';
import { AddCallLogHandler } from './commands/add-call-log/handler';
import { CreateLeadSourceHandler } from './commands/create-source/handler';
import { GetAllLeadsHandler } from './queries/get-all-leads/handler';
import { GetOneLeadHandler } from './queries/get-one-lead/handler';
import { GetLeadSourcesHandler } from './queries/get-sources/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Lead, LeadSource, CallLog])],
  controllers: [LeadsController],
  providers: [
    CreateLeadHandler, UpdateLeadHandler, DeleteLeadHandler, ConvertLeadHandler,
    AddCallLogHandler, CreateLeadSourceHandler,
    GetAllLeadsHandler, GetOneLeadHandler, GetLeadSourcesHandler,
  ],
  exports: [TypeOrmModule],
})
export class LeadsModule {}