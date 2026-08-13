import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ConvertLeadRequest {
  @ApiProperty({ description: 'Ro\'yxatga olingan studentId' }) @IsUUID() studentId: string;
}