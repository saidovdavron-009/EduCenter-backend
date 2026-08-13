import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead, CallLog } from '../../entities/lead.entity';

@Injectable()
export class GetOneLeadHandler {
  constructor(
    @InjectRepository(Lead) private readonly leadRepo: Repository<Lead>,
    @InjectRepository(CallLog) private readonly callLogRepo: Repository<CallLog>,
  ) {}

  async execute(id: string) {
    const lead = await this.leadRepo.findOne({ where: { id } });
    if (!lead) throw new NotFoundException('Lead topilmadi');
    const callLogs = await this.callLogRepo.find({ where: { leadId: id }, order: { createdAt: 'DESC' } });
    return { ...lead, callLogs };
  }
}