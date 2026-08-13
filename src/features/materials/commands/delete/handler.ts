import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../../entities/material.entity';

@Injectable()
export class DeleteMaterialHandler {
  constructor(@InjectRepository(Material) private readonly repo: Repository<Material>) {}

  async execute(id: string) {
    const m = await this.repo.findOne({ where: { id } });
    if (!m) throw new NotFoundException('Material topilmadi');
    await this.repo.delete(id);
    return { message: 'Material o\'chirildi' };
  }
}