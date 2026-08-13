import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum, IsNumber, Min, IsArray, IsBoolean, IsDateString } from 'class-validator';
import { SalaryType } from '../../../../common/types';

export class UpdateTeacherRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() fullName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional() @IsOptional() @IsArray() @IsString({ each: true }) subjects?: string[];
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) experience?: number;
  @ApiPropertyOptional({ enum: SalaryType }) @IsOptional() @IsEnum(SalaryType) salaryType?: SalaryType;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) salary?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() bio?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() avatarUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsDateString() hireDate?: string;
}
