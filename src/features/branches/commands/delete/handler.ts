import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '../../entities/branch.entity';
import { DeleteBranchResponse } from './response';

@Injectable()
export class DeleteBranchHandler {
  constructor(
    @InjectRepository(Branch) private readonly branchRepo: Repository<Branch>,
  ) {}

  async execute(id: string): Promise<DeleteBranchResponse> {
    const branch = await this.branchRepo.findOne({ where: { id } });
    if (!branch) throw new NotFoundException('Filial topilmadi');
    await this.branchRepo.remove(branch);
    return { message: 'Filial muvaffaqiyatli o\'chirildi' };
  }
}