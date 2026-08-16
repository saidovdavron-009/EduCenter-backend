import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../../../auth/entities/user.entity';
import { UserRole } from '../../../../common/types';

// Salary records can be issued to any paid staff member — teachers and
// regular admins — not just teachers, so this pulls straight from users
// rather than the teachers table. The super admin is excluded: they don't
// draw a salary through this system.
@Injectable()
export class GetStaffSalaryEmployeesHandler {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async execute() {
    return this.userRepo.find({
      where: { role: In([UserRole.ADMIN, UserRole.TEACHER]), isSuperAdmin: false, isActive: true },
      order: { fullName: 'ASC' },
      select: ['id', 'fullName', 'role'],
    });
  }
}
