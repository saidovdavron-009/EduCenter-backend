import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../../entities/group.entity';
import { UpdateGroupRequest } from './request';

@Injectable()
export class UpdateGroupHandler {
  constructor(@InjectRepository(Group) private readonly repo: Repository<Group>) {}

  async execute(id: string, dto: UpdateGroupRequest) {
    const group = await this.repo.findOne({ where: { id } });
    if (!group) throw new NotFoundException('Guruh topilmadi');
    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id } });
  }
}