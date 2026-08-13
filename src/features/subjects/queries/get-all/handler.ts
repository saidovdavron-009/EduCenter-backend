import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../../entities/subject.entity';
import { GetAllSubjectsRequest } from './request';

@Injectable()
export class GetAllSubjectsHandler {
  constructor(@InjectRepository(Subject) private readonly repo: Repository<Subject>) {}

  async execute(query: GetAllSubjectsRequest) {
    const qb = this.repo.createQueryBuilder('s');

    if (query.search) {
      qb.andWhere('s.name ILIKE :search OR s.description ILIKE :search', { search: `%${query.search}%` });
    }
    if (query.isActive !== undefined) {
      qb.andWhere('s.isActive = :isActive', { isActive: query.isActive });
    } else {
      qb.andWhere('s.isActive = true');
    }

    return qb.orderBy('s.name', 'ASC').getMany();
  }
}