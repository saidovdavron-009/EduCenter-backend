import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateLeadRequest {
  @ApiProperty({ example: 'Alisher Karimov' }) @IsString() fullName: string;
  @ApiProperty({ example: '+998901234567' }) @IsString() phone: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() sourceId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() interestSubjectId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() assignedAdminId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() branchId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() trialDate?: string;
}