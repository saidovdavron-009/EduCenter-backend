import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../../entities/lead.entity';
import { CreateLeadRequest } from './request';

@Injectable()
export class CreateLeadHandler {
  constructor(@InjectRepository(Lead) private readonly leadRepo: Repository<Lead>) {}

  async execute(dto: CreateLeadRequest) {
    const lead = this.leadRepo.create(dto);
    return this.leadRepo.save(lead);
  }
}