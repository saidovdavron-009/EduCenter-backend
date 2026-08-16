import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber, Min, MinLength, IsArray, IsDateString } from 'class-validator';
import { SalaryType } from '../../../../common/types';

export class CreateTeacherRequest {
  @ApiProperty({ example: 'Sardor Yusupov' })
  @IsString() @MinLength(2)
  fullName: string;

  @ApiProperty({ example: '+998901234567' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ type: [String], example: ['Matematika', 'Fizika'] })
  @IsOptional() @IsArray() @IsString({ each: true })
  subjects?: string[];

  @ApiPropertyOptional({ example: 5 })
  @IsOptional() @IsNumber() @Min(0)
  experience?: number;

  @ApiPropertyOptional({ example: 3, description: 'Nechta guruhga biriktirish mumkin (bo\'sh — cheklovsiz)' })
  @IsOptional() @IsNumber() @Min(1)
  maxGroups?: number;

  @ApiPropertyOptional({ enum: SalaryType, default: SalaryType.MONTHLY })
  @IsOptional() @IsEnum(SalaryType)
  salaryType?: SalaryType;

  @ApiPropertyOptional({ example: 3000000 })
  @IsOptional() @IsNumber() @Min(0)
  salary?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: '2024-01-01' })
  @IsOptional() @IsDateString()
  hireDate?: string;
}