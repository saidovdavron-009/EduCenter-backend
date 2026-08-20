import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../entities/setting.entity';
import { AuditAction } from '../../../common/types';

// Umumiy audit_log yozuvchi — "barcha o'zgarishlar audit_log ga yoziladi
// (kim, qachon, nima o'zgardi)" talabini bir joyda markazlashtiradi.
@Injectable()
export class AuditLogService {
  constructor(@InjectRepository(AuditLog) private readonly repo: Repository<AuditLog>) {}

  async record(params: {
    userId: string | null;
    action: AuditAction;
    tableName: string;
    rowId: string;
    oldValues?: Record<string, any>;
    newValues?: Record<string, any>;
  }): Promise<void> {
    await this.repo.save(this.repo.create(params));
  }
}
