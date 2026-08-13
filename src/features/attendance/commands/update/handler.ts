import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../../entities/attendance.entity';
import { UpdateAttendanceRequest } from './request';

@Injectable()
export class UpdateAttendanceHandler {
  constructor(@InjectRepository(Attendance) private readonly repo: Repository<Attendance>) {}

  async execute(id: string, dto: UpdateAttendanceRequest) {
    const a = await this.repo.findOne({ where: { id } });
    if (!a) throw new NotFoundException('Davomat topilmadi');
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }
}