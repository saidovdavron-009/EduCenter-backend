import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../../entities/material.entity';
import { GetAllMaterialsRequest } from './request';

@Injectable()
export class GetAllMaterialsHandler {
  constructor(@InjectRepository(Material) private readonly repo: Repository<Material>) {}

  async execute(query: GetAllMaterialsRequest) {
    const qb = this.repo.createQueryBuilder('m');
    if (query.groupId) qb.andWhere('m.groupId = :groupId', { groupId: query.groupId });
    if (query.teacherId) qb.andWhere('m.teacherId = :teacherId', { teacherId: query.teacherId });
    if (query.type) qb.andWhere('m.type = :type', { type: query.type });
    return qb.orderBy('m.createdAt', 'DESC').getMany();
  }
}