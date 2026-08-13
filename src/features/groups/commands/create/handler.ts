import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../../entities/group.entity';
import { CreateGroupRequest } from './request';

@Injectable()
export class CreateGroupHandler {
  constructor(@InjectRepository(Group) private readonly repo: Repository<Group>) {}

  async execute(dto: CreateGroupRequest) {
    const exists = await this.repo.findOne({ where: { name: dto.name } });
    if (exists) throw new ConflictException(`"${dto.name}" nomli guruh allaqachon mavjud`);

    const group = this.repo.create({
      ...dto,
      capacity: dto.capacity || 20,
      startDate: dto.startDate ? new Date(dto.startDate) : null,
    });
    return this.repo.save(group);
  }
}