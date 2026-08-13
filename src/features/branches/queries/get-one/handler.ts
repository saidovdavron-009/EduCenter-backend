import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '../../entities/branch.entity';
import { GetOneBranchResponse } from './response';

@Injectable()
export class GetOneBranchHandler {
  constructor(
    @InjectRepository(Branch) private readonly branchRepo: Repository<Branch>,
  ) {}

  async execute(id: string): Promise<GetOneBranchResponse> {
    const branch = await this.branchRepo.findOne({ where: { id } });
    if (!branch) throw new NotFoundException('Filial topilmadi');
    return branch;
  }
}