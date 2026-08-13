import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { DiscountType } from '../../../common/types';

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'student_id', type: 'uuid' }) studentId: string;
  @Column({ name: 'group_id', nullable: true, type: 'uuid' }) groupId: string;
  @Column({ type: 'enum', enum: DiscountType }) type: DiscountType;
  @Column({ type: 'decimal', precision: 5, scale: 2 }) percentage: number;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'expired_at', type: 'date', nullable: true }) expiredAt: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}