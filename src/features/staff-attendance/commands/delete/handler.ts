import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffAttendance } from '../../entities/staff-attendance.entity';

@Injectable()
export class DeleteStaffAttendanceHandler {
  constructor(@InjectRepository(StaffAttendance) private readonly repo: Repository<StaffAttendance>) {}

  async execute(id: string) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Yozuv topilmadi');
    await this.repo.remove(record);
    return { message: 'Yozuv o\'chirildi' };
  }
}
