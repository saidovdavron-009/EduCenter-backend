import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../../entities/lead.entity';
import { UpdateLeadRequest } from './request';

@Injectable()
export class UpdateLeadHandler {
  constructor(@InjectRepository(Lead) private readonly leadRepo: Repository<Lead>) {}

  async execute(id: string, dto: UpdateLeadRequest) {
    const lead = await this.leadRepo.findOne({ where: { id } });
    if (!lead) throw new NotFoundException('Lead topilmadi');
    Object.assign(lead, dto);
    return this.leadRepo.save(lead);
  }
}