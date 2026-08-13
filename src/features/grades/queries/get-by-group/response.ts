import { ApiProperty } from '@nestjs/swagger';
export class GroupGradesResponse { @ApiProperty() groupId: string; @ApiProperty() data: any[]; }