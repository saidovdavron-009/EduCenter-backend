import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../../entities/contract.entity';
import { UpdateContractRequest } from './request';

@Injectable()
export class UpdateContractHandler {
  constructor(@InjectRepository(Contract) private readonly contractRepo: Repository<Contract>) {}

  async execute(id: string, dto: UpdateContractRequest) {
    const contract = await this.contractRepo.findOne({ where: { id } });
    if (!contract) throw new NotFoundException('Shartnoma topilmadi');
    Object.assign(contract, dto);
    return this.contractRepo.save(contract);
  }
}