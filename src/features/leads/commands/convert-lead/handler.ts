import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../../entities/lead.entity';
import { ConvertLeadRequest } from './request';
import { LeadStatus } from '../../../../common/types';

@Injectable()
export class ConvertLeadHandler {
  constructor(@InjectRepository(Lead) private readonly leadRepo: Repository<Lead>) {}

  async execute(leadId: string, dto: ConvertLeadRequest) {
    const lead = await this.leadRepo.findOne({ where: { id: leadId } });
    if (!lead) throw new NotFoundException('Lead topilmadi');
    lead.status = LeadStatus.REGISTERED;
    lead.studentId = dto.studentId;
    lead.convertedAt = new Date();
    return this.leadRepo.save(lead);
  }
}