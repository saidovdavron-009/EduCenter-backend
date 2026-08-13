import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLeadSourceRequest {
  @ApiProperty({ example: 'INSTAGRAM' }) @IsString() name: string;
}