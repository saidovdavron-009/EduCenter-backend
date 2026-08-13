import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';

@Injectable()
export class DeleteTaskHandler {
  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>) {}

  async execute(id: string) {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Vazifa topilmadi');
    await this.taskRepo.remove(task);
    return { message: 'Vazifa o\'chirildi' };
  }
}