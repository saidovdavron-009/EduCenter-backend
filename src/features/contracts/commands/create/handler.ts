import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../../entities/contract.entity';
import { CreateContractRequest } from './request';

@Injectable()
export class CreateContractHandler {
  constructor(@InjectRepository(Contract) private readonly contractRepo: Repository<Contract>) {}

  async execute(dto: CreateContractRequest) {
    const existing = await this.contractRepo.findOne({ where: { contractNumber: dto.contractNumber } });
    if (existing) throw new ConflictException('Bu shartnoma raqami allaqachon mavjud');
    const contract = this.contractRepo.create(dto);
    return this.contractRepo.save(contract);
  }
}