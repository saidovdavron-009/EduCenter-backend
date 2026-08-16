import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Group } from '../../entities/group.entity';
import { Teacher } from '../../../teachers/entities/teacher.entity';
import { UpdateGroupRequest } from './request';
import { GroupStatus } from '../../../../common/types';

@Injectable()
export class UpdateGroupHandler {
  constructor(
    @InjectRepository(Group) private readonly repo: Repository<Group>,
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async execute(id: string, dto: UpdateGroupRequest) {
    const group = await this.repo.findOne({ where: { id } });
    if (!group) throw new NotFoundException('Guruh topilmadi');

    if (dto.teacherId && dto.teacherId !== group.teacherId) {
      const teacher = await this.teacherRepo.findOne({ where: { id: dto.teacherId } });
      if (teacher?.maxGroups != null) {
        const currentCount = await this.repo.count({
          where: { teacherId: dto.teacherId, status: In([GroupStatus.ACTIVE, GroupStatus.FULL]) },
        });
        if (currentCount >= teacher.maxGroups) {
          throw new ConflictException(
            `${teacher.fullName} allaqachon maksimal ${teacher.maxGroups} ta guruhga biriktirilgan`,
          );
        }
      }
    }

    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id } });
  }
}