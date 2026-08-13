import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadSource } from '../../entities/lead.entity';

@Injectable()
export class GetLeadSourcesHandler {
  constructor(@InjectRepository(LeadSource) private readonly sourceRepo: Repository<LeadSource>) {}

  async execute() {
    const data = await this.sourceRepo.find();
    return { data };
  }
}