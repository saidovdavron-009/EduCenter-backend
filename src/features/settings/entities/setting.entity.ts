import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AppSettingType, SmsStatus, AuditAction } from '../../../common/types';

@Entity('app_settings')
export class AppSetting {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) key: string;
  @Column({ type: 'text', nullable: true }) value: string;
  @Column({ type: 'enum', enum: AppSettingType, default: AppSettingType.STRING }) type: AppSettingType;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}

@Entity('holidays')
export class Holiday {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @Column({ name: 'start_date', type: 'date' }) startDate: string;
  @Column({ name: 'end_date', type: 'date' }) endDate: string;
  @Column({ name: 'branch_id', nullable: true, type: 'uuid' }) branchId: string;
}

@Entity('sms_logs')
export class SmsLog {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() phone: string;
  @Column({ type: 'text' }) message: string;
  @Column({ name: 'provider_id', nullable: true }) providerId: string;
  @Column({ type: 'enum', enum: SmsStatus, nullable: true }) status: SmsStatus;
  @CreateDateColumn({ name: 'sent_at' }) sentAt: Date;
}

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'user_id', nullable: true, type: 'uuid' }) userId: string;
  @Column({ type: 'enum', enum: AuditAction }) action: AuditAction;
  @Column({ name: 'table_name' }) tableName: string;
  @Column({ name: 'row_id', nullable: true }) rowId: string;
  @Column({ name: 'old_values', type: 'jsonb', nullable: true }) oldValues: any;
  @Column({ name: 'new_values', type: 'jsonb', nullable: true }) newValues: any;
  @Column({ name: 'ip_address', nullable: true }) ipAddress: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}