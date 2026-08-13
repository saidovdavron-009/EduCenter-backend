import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { UpdateTaskRequest } from './request';

@Injectable()
export class UpdateTaskHandler {
  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>) {}

  async execute(id: string, dto: UpdateTaskRequest) {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Vazifa topilmadi');
    Object.assign(task, dto);
    return this.taskRepo.save(task);
  }
}