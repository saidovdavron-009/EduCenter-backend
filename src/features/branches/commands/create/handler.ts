import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '../../entities/branch.entity';
import { CreateBranchRequest } from './request';
import { CreateBranchResponse } from './response';

@Injectable()
export class CreateBranchHandler {
  constructor(
    @InjectRepository(Branch) private readonly branchRepo: Repository<Branch>,
  ) {}

  async execute(dto: CreateBranchRequest): Promise<CreateBranchResponse> {
    const branch = this.branchRepo.create(dto);
    return this.branchRepo.save(branch);
  }
}