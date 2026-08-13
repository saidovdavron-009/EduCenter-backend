import { ApiProperty } from '@nestjs/swagger';
import { MaterialType } from '../../../../common/types';
export class MaterialItem { @ApiProperty() id: string; @ApiProperty() title: string; @ApiProperty({ enum: MaterialType }) type: MaterialType; @ApiProperty() url: string; @ApiProperty() teacherName: string; }