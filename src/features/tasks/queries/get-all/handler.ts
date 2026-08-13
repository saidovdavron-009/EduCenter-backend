import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { GetAllTasksRequest } from './request';

@Injectable()
export class GetAllTasksHandler {
  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>) {}

  async execute(query: GetAllTasksRequest) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const qb = this.taskRepo.createQueryBuilder('t');
    if (query.assignedTo) qb.andWhere('t.assigned_to = :assignedTo', { assignedTo: query.assignedTo });
    if (query.status) qb.andWhere('t.status = :status', { status: query.status });
    if (query.priority) qb.andWhere('t.priority = :priority', { priority: query.priority });
    qb.orderBy('t.created_at', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}