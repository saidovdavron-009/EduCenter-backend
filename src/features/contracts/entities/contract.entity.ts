import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ContractStatus } from '../../../common/types';

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'student_id', type: 'uuid' }) studentId: string;
  @Column({ name: 'contract_number', unique: true }) contractNumber: string;
  @Column({ name: 'file_url', nullable: true }) fileUrl: string;
  @Column({ name: 'signed_at', type: 'timestamptz', nullable: true }) signedAt: Date;
  @Column({ name: 'expires_at', type: 'date', nullable: true }) expiresAt: Date;
  @Column({ type: 'enum', enum: ContractStatus, default: ContractStatus.ACTIVE }) status: ContractStatus;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}