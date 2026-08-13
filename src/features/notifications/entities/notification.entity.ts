import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { NotificationType } from '../../../common/types';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'user_id', type: 'uuid' }) userId: string;
  @Column({ type: 'enum', enum: NotificationType }) type: NotificationType;
  @Column() title: string;
  @Column({ type: 'text' }) message: string;
  @Column({ name: 'is_read', default: false }) isRead: boolean;
  @Column({ type: 'jsonb', nullable: true }) data: Record<string, any>;
  @Column({ name: 'sent_at', type: 'timestamptz', nullable: true }) sentAt: Date;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
