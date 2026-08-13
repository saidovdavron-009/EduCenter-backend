import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsUUID } from 'class-validator';

export class GetAllQuizzesRequest {
  @ApiPropertyOptional() @IsOptional() @IsNumberString() page?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumberString() limit?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() groupId?: string;
}