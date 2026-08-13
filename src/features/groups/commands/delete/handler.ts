import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../../entities/group.entity';
import { GroupStatus } from '../../../../common/types';

@Injectable()
export class DeleteGroupHandler {
  constructor(@InjectRepository(Group) private readonly repo: Repository<Group>) {}

  async execute(id: string) {
    const group = await this.repo.findOne({ where: { id } });
    if (!group) throw new NotFoundException('Guruh topilmadi');
    await this.repo.update(id, { status: GroupStatus.CLOSED });
    return { message: 'Guruh yopildi' };
  }
}