import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../../entities/group.entity';
import { GroupStudent } from '../../../students/entities/student.entity';
import { GroupStatus } from '../../../../common/types';
import { AddStudentToGroupRequest } from './request';

@Injectable()
export class AddStudentToGroupHandler {
  constructor(
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    @InjectRepository(GroupStudent) private readonly gsRepo: Repository<GroupStudent>,
  ) {}

  async execute(groupId: string, dto: AddStudentToGroupRequest) {
    const group = await this.groupRepo.findOne({ where: { id: groupId } });
    if (!group) throw new NotFoundException('Guruh topilmadi');
    if (group.status === GroupStatus.CLOSED) throw new BadRequestException('Guruh yopilgan');

    const existing = await this.gsRepo.findOne({
      where: { groupId, studentId: dto.studentId, status: 'ACTIVE' },
    });
    if (existing) throw new ConflictException('O\'quvchi allaqachon bu guruhda');

    const activeCount = await this.gsRepo.count({ where: { groupId, status: 'ACTIVE' } });
    if (activeCount >= group.capacity) {
      await this.groupRepo.update(groupId, { status: GroupStatus.FULL });
      throw new BadRequestException('Guruh to\'lgan');
    }

    const gs = this.gsRepo.create({ groupId, studentId: dto.studentId, status: 'ACTIVE' });
    await this.gsRepo.save(gs);

    const newCount = activeCount + 1;
    if (newCount >= group.capacity) {
      await this.groupRepo.update(groupId, { status: GroupStatus.FULL });
    }

    return { message: 'O\'quvchi guruhga qo\'shildi' };
  }
}