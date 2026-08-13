import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { CreateTaskRequest } from './request';
import { RequestUser } from '../../../../common/types';

@Injectable()
export class CreateTaskHandler {
  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>) {}

  async execute(dto: CreateTaskRequest, user: RequestUser) {
    const task = this.taskRepo.create({ ...dto, createdBy: user.id });
    return this.taskRepo.save(task);
  }
}