import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../../entities/material.entity';
import { UpdateMaterialRequest } from './request';

@Injectable()
export class UpdateMaterialHandler {
  constructor(@InjectRepository(Material) private readonly repo: Repository<Material>) {}

  async execute(id: string, dto: UpdateMaterialRequest) {
    const material = await this.repo.findOne({ where: { id } });
    if (!material) throw new NotFoundException('Material topilmadi');
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }
}
