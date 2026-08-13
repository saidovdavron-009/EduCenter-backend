import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '../../entities/branch.entity';
import { UpdateBranchRequest } from './request';
import { UpdateBranchResponse } from './response';

@Injectable()
export class UpdateBranchHandler {
  constructor(
    @InjectRepository(Branch) private readonly branchRepo: Repository<Branch>,
  ) {}

  async execute(id: string, dto: UpdateBranchRequest): Promise<UpdateBranchResponse> {
    const branch = await this.branchRepo.findOne({ where: { id } });
    if (!branch) throw new NotFoundException('Filial topilmadi');
    Object.assign(branch, dto);
    return this.branchRepo.save(branch);
  }
}