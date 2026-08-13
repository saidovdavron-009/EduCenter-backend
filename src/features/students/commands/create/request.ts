import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString, IsEmail, IsOptional, IsEnum, IsDateString,
  MinLength,
} from 'class-validator';
import { Gender } from '../../../../common/types';

export class CreateStudentRequest {
  @ApiProperty({ example: 'Alisher Umarov' })
  @IsString()
  @MinLength(2)
  fullName: string;

  @ApiProperty({ example: '+998901234567' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ example: '+998901234568' })
  @IsOptional()
  @IsString()
  parentPhone?: string;

  @ApiPropertyOptional({ example: 'parent@example.com' })
  @IsOptional()
  @IsEmail()
  parentEmail?: string;

  @ApiPropertyOptional({ example: '2005-03-15' })
  @IsOptional()
  @IsDateString()
  dob?: string;

  @ApiPropertyOptional({ enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional({ example: 'Toshkent, Yunusobod tumani' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Instagram' })
  @IsOptional()
  @IsString()
  referralSource?: string;

  @ApiPropertyOptional({ example: 'group-uuid', description: 'Guruh ID (ixtiyoriy)' })
  @IsOptional()
  @IsString()
  groupId?: string;
}