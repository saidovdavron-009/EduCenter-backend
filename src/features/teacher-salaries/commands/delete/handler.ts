import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherSalary } from '../../entities/teacher-salary.entity';

@Injectable()
export class DeleteTeacherSalaryHandler {
  constructor(@InjectRepository(TeacherSalary) private readonly repo: Repository<TeacherSalary>) {}

  async execute(id: string) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Maosh yozuvi topilmadi');
    await this.repo.remove(record);
    return { message: 'Maosh yozuvi o\'chirildi' };
  }
}
