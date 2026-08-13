import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../../entities/contract.entity';

@Injectable()
export class DeleteContractHandler {
  constructor(@InjectRepository(Contract) private readonly contractRepo: Repository<Contract>) {}

  async execute(id: string) {
    const contract = await this.contractRepo.findOne({ where: { id } });
    if (!contract) throw new NotFoundException('Shartnoma topilmadi');
    await this.contractRepo.remove(contract);
    return { message: 'Shartnoma o\'chirildi' };
  }
}