import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Teacher } from '../../entities/teacher.entity';
import { User } from '../../../auth/entities/user.entity';
import { CreateTeacherRequest } from './request';
import { UserRole, SalaryType } from '../../../../common/types';
import { generateLoginId, generatePassword } from '../../../../common/utils/credentials.util';

@Injectable()
export class CreateTeacherHandler {
  constructor(
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async execute(dto: CreateTeacherRequest) {
    let loginId: string;
    do {
      loginId = generateLoginId();
    } while (await this.userRepo.findOne({ where: { loginId } }));
    const tempPassword = generatePassword();

    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      const passwordHash = await bcrypt.hash(tempPassword, 12);
      const user = qr.manager.create(User, {
        loginId, passwordHash, role: UserRole.TEACHER, isActive: true,
      });
      await qr.manager.save(user);

      const teacher = qr.manager.create(Teacher, {
        userId: user.id, fullName: dto.fullName, phone: dto.phone,
        subjects: dto.subjects || [], experience: dto.experience,
        salaryType: dto.salaryType || SalaryType.MONTHLY, salary: dto.salary || 0,
        bio: dto.bio, hireDate: dto.hireDate ? new Date(dto.hireDate) : null,
        maxGroups: dto.maxGroups ?? null,
      });
      await qr.manager.save(teacher);
      await qr.commitTransaction();

      return { id: teacher.id, userId: teacher.userId, fullName: teacher.fullName, phone: teacher.phone, loginId, tempPassword, createdAt: teacher.createdAt };
    } catch (err) {
      await qr.rollbackTransaction();
      throw err;
    } finally {
      await qr.release();
    }
  }
}