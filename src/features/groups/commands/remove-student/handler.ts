import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../../entities/group.entity';
import { GroupStudent } from '../../../students/entities/student.entity';
import { GroupStatus } from '../../../../common/types';

@Injectable()
export class RemoveStudentFromGroupHandler {
  constructor(
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    @InjectRepository(GroupStudent) private readonly gsRepo: Repository<GroupStudent>,
  ) {}

  async execute(groupId: string, studentId: string) {
    const gs = await this.gsRepo.findOne({ where: { groupId, studentId, status: 'ACTIVE' } });
    if (!gs) throw new NotFoundException('O\'quvchi bu guruhda topilmadi');

    await this.gsRepo.update(gs.id, { status: 'LEFT', leftAt: new Date() });

    const group = await this.groupRepo.findOne({ where: { id: groupId } });
    if (group?.status === GroupStatus.FULL) {
      await this.groupRepo.update(groupId, { status: GroupStatus.ACTIVE });
    }

    return { message: 'O\'quvchi guruhdan chiqarildi' };
  }
}