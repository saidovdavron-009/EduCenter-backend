import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Group } from '../../entities/group.entity';
import { Teacher } from '../../../teachers/entities/teacher.entity';
import { CreateGroupRequest } from './request';
import { GroupStatus } from '../../../../common/types';

@Injectable()
export class CreateGroupHandler {
  constructor(
    @InjectRepository(Group) private readonly repo: Repository<Group>,
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async execute(dto: CreateGroupRequest) {
    const exists = await this.repo.findOne({ where: { name: dto.name } });
    if (exists) throw new ConflictException(`"${dto.name}" nomli guruh allaqachon mavjud`);

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

    const group = this.repo.create({
      ...dto,
      capacity: dto.capacity || 20,
      startDate: dto.startDate ? new Date(dto.startDate) : null,
    });
    return this.repo.save(group);
  }
}