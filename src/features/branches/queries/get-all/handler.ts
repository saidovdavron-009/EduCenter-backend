import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '../../entities/branch.entity';
import { GetAllBranchesRequest } from './request';
import { GetAllBranchesResponse } from './response';

@Injectable()
export class GetAllBranchesHandler {
  constructor(
    @InjectRepository(Branch) private readonly branchRepo: Repository<Branch>,
  ) {}

  async execute(query: GetAllBranchesRequest): Promise<GetAllBranchesResponse> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const qb = this.branchRepo.createQueryBuilder('b');
    if (query.search) qb.where('b.name ILIKE :s', { s: `%${query.search}%` });
    qb.orderBy('b.created_at', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}