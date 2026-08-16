import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateAdminRequest {
  @ApiProperty({ example: 'Aziz Karimov' })
  @IsString()
  @MinLength(2)
  fullName: string;

  @ApiPropertyOptional({ example: '+998901234567' })
  @IsOptional()
  @IsString()
  phone?: string;
}
