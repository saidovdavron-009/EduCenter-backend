import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsEnum, IsNumber, Min, IsDateString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod, PaymentStatus } from '../../../../common/types';
export class GetAllPaymentsRequest {
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @Min(1) page?: number = 1;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() limit?: number = 30;
  @ApiPropertyOptional() @IsOptional() @IsUUID() studentId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() groupId?: string;
  @ApiPropertyOptional({ enum: PaymentStatus }) @IsOptional() @IsEnum(PaymentStatus) status?: PaymentStatus;
  @ApiPropertyOptional({ enum: PaymentMethod }) @IsOptional() @IsEnum(PaymentMethod) method?: PaymentMethod;
  @ApiPropertyOptional() @IsOptional() @IsDateString() dateFrom?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() dateTo?: string;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() month?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() year?: number;
  // Qarzdorlar filtri: kutilayotgan yoki muddati o'tgan barcha to'lovlarni ko'rsatadi (status'dan mustaqil).
  @ApiPropertyOptional({ description: 'Faqat qarzdorlar (PENDING yoki OVERDUE)' })
  @IsOptional() @Type(() => Boolean) @IsBoolean() debtorsOnly?: boolean;
}