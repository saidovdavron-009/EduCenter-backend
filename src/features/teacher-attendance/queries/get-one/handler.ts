import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherAttendance } from '../../entities/teacher-attendance.entity';

@Injectable()
export class GetOneTeacherAttendanceHandler {
  constructor(@InjectRepository(TeacherAttendance) private readonly repo: Repository<TeacherAttendance>) {}

  async execute(id: string) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Yozuv topilmadi');
    return record;
  }
}
