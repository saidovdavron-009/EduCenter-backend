import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Student, GroupStudent } from '../../entities/student.entity';
import { User } from '../../../auth/entities/user.entity';
import { CreateStudentRequest } from './request';
import { CreateStudentResponse } from './response';
import { UserRole, StudentStatus } from '../../../../common/types';
import { generateLoginId, generatePassword } from '../../../../common/utils/credentials.util';

@Injectable()
export class CreateStudentHandler {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(GroupStudent) private readonly groupStudentRepo: Repository<GroupStudent>,
    private readonly dataSource: DataSource,
  ) {}

  async execute(dto: CreateStudentRequest): Promise<CreateStudentResponse> {
    let loginId: string;
    do {
      loginId = generateLoginId();
    } while (await this.userRepo.findOne({ where: { loginId } }));
    const tempPassword = generatePassword();

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const passwordHash = await bcrypt.hash(tempPassword, 12);

      const user = queryRunner.manager.create(User, {
        loginId,
        passwordHash,
        role: UserRole.STUDENT,
        isActive: true,
      });
      await queryRunner.manager.save(user);

      const student = queryRunner.manager.create(Student, {
        userId: user.id,
        fullName: dto.fullName,
        phone: dto.phone,
        parentPhone: dto.parentPhone,
        parentEmail: dto.parentEmail,
        dob: dto.dob ? new Date(dto.dob) : null,
        gender: dto.gender,
        address: dto.address,
        referralSource: dto.referralSource,
        status: StudentStatus.ACTIVE,
      });
      await queryRunner.manager.save(student);

      if (dto.groupId) {
        const gs = queryRunner.manager.create(GroupStudent, {
          groupId: dto.groupId,
          studentId: student.id,
          joinedAt: new Date(),
          status: 'ACTIVE',
        });
        await queryRunner.manager.save(gs);
      }

      await queryRunner.commitTransaction();

      return {
        id: student.id,
        userId: student.userId,
        fullName: student.fullName,
        phone: student.phone,
        parentPhone: student.parentPhone,
        loginId,
        tempPassword,
        status: student.status,
        createdAt: student.createdAt,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}