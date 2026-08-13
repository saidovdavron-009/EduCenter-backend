import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../../entities/lead.entity';

@Injectable()
export class DeleteLeadHandler {
  constructor(@InjectRepository(Lead) private readonly leadRepo: Repository<Lead>) {}

  async execute(id: string) {
    const lead = await this.leadRepo.findOne({ where: { id } });
    if (!lead) throw new NotFoundException('Lead topilmadi');
    await this.leadRepo.remove(lead);
    return { message: 'Lead o\'chirildi' };
  }
}