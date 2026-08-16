import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  level: string;

  @Column({ name: 'icon_url', nullable: true })
  iconUrl: string;

  @Column({ name: 'monthly_fee', type: 'decimal', precision: 12, scale: 2, default: 0 })
  monthlyFee: number;

  @Column({ type: 'simple-array', nullable: true })
  days: string[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}