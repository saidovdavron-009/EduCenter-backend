
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../../entities/teacher.entity';
import { UpdateTeacherRequest } from './request';

@Injectable()
export class UpdateTeacherHandler {
  constructor(@InjectRepository(Teacher) private readonly repo: Repository<Teacher>) {}

  async execute(id: string, dto: UpdateTeacherRequest) {
    const teacher = await this.repo.findOne({ where: { id } });
    if (!teacher) throw new NotFoundException('O\'qituvchi topilmadi');
    const updateData: any = { ...dto };
    if (dto.hireDate) updateData.hireDate = new Date(dto.hireDate);
    await this.repo.update(id, updateData);
    return this.repo.findOne({ where: { id } });
  }
}