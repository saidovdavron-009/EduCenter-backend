import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherAttendance } from '../../entities/teacher-attendance.entity';
import { UpdateTeacherAttendanceRequest } from './request';

@Injectable()
export class UpdateTeacherAttendanceHandler {
  constructor(@InjectRepository(TeacherAttendance) private readonly repo: Repository<TeacherAttendance>) {}

  async execute(id: string, dto: UpdateTeacherAttendanceRequest) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Yozuv topilmadi');
    Object.assign(record, dto);
    return this.repo.save(record);
  }
}