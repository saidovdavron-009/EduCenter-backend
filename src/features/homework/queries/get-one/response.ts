import { ApiProperty } from '@nestjs/swagger';
export class GetOneHomeworkResponse { @ApiProperty() id: string; @ApiProperty() title: string; @ApiProperty() submissions: any[]; }