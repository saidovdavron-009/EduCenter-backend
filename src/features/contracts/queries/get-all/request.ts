import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsUUID, IsEnum } from 'class-validator';
import { ContractStatus } from '../../../../common/types';

export class GetAllContractsRequest {
  @ApiPropertyOptional() @IsOptional() @IsNumberString() page?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumberString() limit?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() studentId?: string;
  @ApiPropertyOptional({ enum: ContractStatus }) @IsOptional() @IsEnum(ContractStatus) status?: ContractStatus;
}