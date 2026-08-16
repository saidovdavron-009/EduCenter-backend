import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../types';
import { User } from '../../features/auth/entities/user.entity';

const logger = new Logger('SuperAdminSeed');

export async function seedSuperAdmin(dataSource: DataSource, config: ConfigService): Promise<void> {
  const loginId = config.get<string>('SUPERADMIN_LOGIN_ID');
  const password = config.get<string>('SUPERADMIN_PASSWORD');

  if (!loginId || !password) {
    logger.warn('SUPERADMIN_LOGIN_ID / SUPERADMIN_PASSWORD .env da topilmadi, superadmin yaratilmadi');
    return;
  }

  const userRepo = dataSource.getRepository(User);
  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await userRepo.findOne({ where: { loginId } });

  if (existing) {
    if (existing.role !== UserRole.ADMIN || !existing.isActive || !existing.isSuperAdmin || !(await bcrypt.compare(password, existing.passwordHash))) {
      await userRepo.update(existing.id, { passwordHash, role: UserRole.ADMIN, isActive: true, isSuperAdmin: true });
      logger.log(`Superadmin (ID: ${loginId}) .env bilan sinxronlashtirildi`);
    }
    return;
  }

  const superAdmin = userRepo.create({
    loginId,
    passwordHash,
    role: UserRole.ADMIN,
    isActive: true,
    isSuperAdmin: true,
    email: '1',
    phone: '1',
  });
  await userRepo.save(superAdmin);
  logger.log(`Superadmin yaratildi (ID: ${loginId})`);
}