import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../entities/student.entity';
import { UpdateStudentRequest } from './request';
import { UpdateStudentResponse } from './response';

@Injectable()
export class UpdateStudentHandler {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
  ) {}

  async execute(id: string, dto: UpdateStudentRequest): Promise<UpdateStudentResponse> {
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) throw new NotFoundException('O\'quvchi topilmadi');

    const updateData: Partial<Student> = {};
    if (dto.fullName !== undefined) updateData.fullName = dto.fullName;
    if (dto.phone !== undefined) updateData.phone = dto.phone;
    if (dto.parentPhone !== undefined) updateData.parentPhone = dto.parentPhone;
    if (dto.parentEmail !== undefined) updateData.parentEmail = dto.parentEmail;
    if (dto.dob !== undefined) updateData.dob = new Date(dto.dob);
    if (dto.gender !== undefined) updateData.gender = dto.gender;
    if (dto.address !== undefined) updateData.address = dto.address;
    if (dto.status !== undefined) updateData.status = dto.status;
    if (dto.referralSource !== undefined) updateData.referralSource = dto.referralSource;
    if (dto.notes !== undefined) updateData.notes = dto.notes;
    if (dto.avatarUrl !== undefined) updateData.avatarUrl = dto.avatarUrl;

    await this.studentRepo.update(id, updateData);
    const updated = await this.studentRepo.findOne({ where: { id } });

    return {
      id: updated.id,
      fullName: updated.fullName,
      status: updated.status,
      updatedAt: updated.updatedAt,
    };
  }
}