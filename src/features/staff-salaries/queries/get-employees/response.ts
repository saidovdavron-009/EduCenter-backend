import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../../common/types';

export class StaffSalaryEmployeeItem {
  @ApiProperty() id: string;
  @ApiProperty({ nullable: true }) fullName: string | null;
  @ApiProperty({ enum: UserRole }) role: UserRole;
}
