import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Parent, StudentParent } from '../../entities/parent.entity';
import { User } from '../../../auth/entities/user.entity';
import { CreateParentRequest } from './request';
import { CreateParentResponse } from './response';
import { UserRole } from '../../../../common/types';
import { generateLoginId, generatePassword } from '../../../../common/utils/credentials.util';

@Injectable()
export class CreateParentHandler {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async execute(dto: CreateParentRequest): Promise<CreateParentResponse> {
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
        loginId, passwordHash, role: UserRole.PARENT, isActive: true,
      });
      await qr.manager.save(user);

      const parent = qr.manager.create(Parent, {
        userId: user.id, fullName: dto.fullName, phone: dto.phone,
      });
      await qr.manager.save(parent);

      if (dto.studentId) {
        const link = qr.manager.create(StudentParent, { studentId: dto.studentId, parentId: parent.id });
        await qr.manager.save(link);
      }

      await qr.commitTransaction();

      return {
        id: parent.id, userId: parent.userId, fullName: parent.fullName,
        phone: parent.phone, loginId, tempPassword, createdAt: parent.createdAt,
      };
    } catch (err) {
      await qr.rollbackTransaction();
      throw err;
    } finally {
      await qr.release();
    }
  }
}