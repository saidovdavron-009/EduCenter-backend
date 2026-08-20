import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { AuditAction, RequestUser } from '../../../common/types';

// Vaqt oynasidan tashqarida (dars boshlanishidan oldin/tugagandan keyin)
// davomat belgilashning YAGONA yo'li — faqat super-admin, faqat sabab
// ko'rsatilgan holda, har doim audit_logs ga yozib qo'yiladi.
@Injectable()
export class LateCorrectionService {
  constructor(private readonly auditLog: AuditLogService) {}

  async authorize(
    user: RequestUser,
    reason: string | undefined,
    tableName: string,
    rowId: string,
  ): Promise<boolean> {
    if (!reason) return false;
    if (!user.isSuperAdmin) {
      throw new ForbiddenException("Vaqt oynasidan tashqarida faqat super-admin, sabab ko'rsatib, tuzatish kirita oladi");
    }

    await this.auditLog.record({
      userId: user.id,
      action: AuditAction.UPDATE,
      tableName,
      rowId,
      newValues: { lateCorrectionReason: reason },
    });

    return true;
  }
}
