import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherAttendance } from '../../entities/teacher-attendance.entity';

@Injectable()
export class DeleteTeacherAttendanceHandler {
  constructor(@InjectRepository(TeacherAttendance) private readonly repo: Repository<TeacherAttendance>) {}

  async execute(id: string) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Yozuv topilmadi');
    await this.repo.remove(record);
    return { message: 'Yozuv o\'chirildi' };
  }
}