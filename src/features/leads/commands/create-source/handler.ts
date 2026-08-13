import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadSource } from '../../entities/lead.entity';
import { CreateLeadSourceRequest } from './request';

@Injectable()
export class CreateLeadSourceHandler {
  constructor(@InjectRepository(LeadSource) private readonly sourceRepo: Repository<LeadSource>) {}

  async execute(dto: CreateLeadSourceRequest) {
    const source = this.sourceRepo.create(dto);
    return this.sourceRepo.save(source);
  }
}