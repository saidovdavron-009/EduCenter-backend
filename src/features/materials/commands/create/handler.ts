import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../../entities/material.entity';
import { Teacher } from '../../../teachers/entities/teacher.entity';
import { CreateMaterialRequest } from './request';

@Injectable()
export class CreateMaterialHandler {
  constructor(
    @InjectRepository(Material) private readonly repo: Repository<Material>,
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async execute(dto: CreateMaterialRequest, userId: string) {
    let teacherId = dto.teacherId;
    if (!teacherId) {
      const teacher = await this.teacherRepo.findOne({ where: { userId } });
      if (!teacher) throw new BadRequestException('teacherId ko\'rsatilishi shart');
      teacherId = teacher.id;
    }

    const material = this.repo.create({ ...dto, teacherId });
    return this.repo.save(material);
  }
}