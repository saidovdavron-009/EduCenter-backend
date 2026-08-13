import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { MaterialType } from '../../../common/types';

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'group_id', nullable: true, type: 'uuid' }) groupId: string;
  @Column({ name: 'teacher_id', type: 'uuid' }) teacherId: string;
  @Column() title: string;
  @Column({ type: 'enum', enum: MaterialType }) type: MaterialType;
  @Column() url: string;
  @Column({ nullable: true }) description: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}