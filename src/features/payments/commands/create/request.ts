import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsNumber, Min, IsOptional, IsString, IsDateString, IsInt } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../../../../common/types';
export class CreatePaymentRequest {
  @ApiProperty() @IsUUID() studentId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() groupId?: string;
  @ApiProperty({ example: 600000 }) @IsNumber() @Min(0) amount: number;
  @ApiProperty({ enum: PaymentMethod }) @IsEnum(PaymentMethod) method: PaymentMethod;
  @ApiPropertyOptional({ enum: PaymentStatus }) @IsOptional() @IsEnum(PaymentStatus) status?: PaymentStatus;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() paidAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() dueDate?: string;
  @ApiPropertyOptional({ example: 3 }) @IsOptional() @IsInt() month?: number;
  @ApiPropertyOptional({ example: 2024 }) @IsOptional() @IsInt() year?: number;
  @ApiPropertyOptional({ example: 50000 }) @IsOptional() @IsNumber() @Min(0) discount?: number;
}