import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Parent } from '../../entities/parent.entity';
import { User } from '../../../auth/entities/user.entity';
import { GetAllParentsRequest } from './request';

@Injectable()
export class GetAllParentsHandler {
  constructor(
    @InjectRepository(Parent) private readonly parentRepo: Repository<Parent>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(query: GetAllParentsRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const qb = this.parentRepo.createQueryBuilder('p');
    if (query.search) qb.where('p.full_name ILIKE :s OR p.phone ILIKE :s', { s: `%${query.search}%` });
    qb.orderBy('p.created_at', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    const userIds = data.map((p) => p.userId).filter(Boolean);
    const users = userIds.length
      ? await this.userRepo.find({ where: { id: In(userIds) }, select: ['id', 'loginId'] })
      : [];
    const loginIdMap = new Map(users.map((u) => [u.id, u.loginId]));

    return {
      data: data.map((p) => ({ ...p, loginId: loginIdMap.get(p.userId) ?? null })),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}