import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { LeadStatus, CallResult } from '../../../common/types';

@Entity('lead_sources')
export class LeadSource {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
}

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'full_name' }) fullName: string;
  @Column() phone: string;
  @Column({ name: 'source_id', nullable: true, type: 'uuid' }) sourceId: string;
  @Column({ type: 'enum', enum: LeadStatus, default: LeadStatus.NEW }) status: LeadStatus;
  @Column({ name: 'interest_subject_id', nullable: true, type: 'uuid' }) interestSubjectId: string;
  @Column({ name: 'assigned_admin_id', nullable: true, type: 'uuid' }) assignedAdminId: string;
  @Column({ name: 'branch_id', nullable: true, type: 'uuid' }) branchId: string;
  @Column({ type: 'text', nullable: true }) notes: string;
  @Column({ name: 'trial_date', type: 'date', nullable: true }) trialDate: string;
  @Column({ name: 'converted_at', type: 'timestamptz', nullable: true }) convertedAt: Date;
  @Column({ name: 'student_id', nullable: true, type: 'uuid' }) studentId: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}

@Entity('call_logs')
export class CallLog {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'lead_id', type: 'uuid' }) leadId: string;
  @Column({ name: 'admin_id', type: 'uuid' }) adminId: string;
  @Column({ type: 'text', nullable: true }) notes: string;
  @Column({ type: 'enum', enum: CallResult, nullable: true }) result: CallResult;
  @Column({ name: 'next_call_at', type: 'timestamptz', nullable: true }) nextCallAt: Date;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}