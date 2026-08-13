import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallLog } from '../../entities/lead.entity';
import { AddCallLogRequest } from './request';
import { RequestUser } from '../../../../common/types';

@Injectable()
export class AddCallLogHandler {
  constructor(@InjectRepository(CallLog) private readonly callLogRepo: Repository<CallLog>) {}

  async execute(dto: AddCallLogRequest, user: RequestUser) {
    const log = this.callLogRepo.create({ ...dto, adminId: user.id });
    return this.callLogRepo.save(log);
  }
}