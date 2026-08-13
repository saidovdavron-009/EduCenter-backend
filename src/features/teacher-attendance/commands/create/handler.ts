import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherAttendance } from '../../entities/teacher-attendance.entity';
import { CreateTeacherAttendanceRequest } from './request';

@Injectable()
export class CreateTeacherAttendanceHandler {
  constructor(@InjectRepository(TeacherAttendance) private readonly repo: Repository<TeacherAttendance>) {}

  async execute(dto: CreateTeacherAttendanceRequest) {
    const record = this.repo.create(dto);
    return this.repo.save(record);
  }
}