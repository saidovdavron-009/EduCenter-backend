import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'branch_id', type: 'uuid' }) branchId: string;
  @Column() name: string;
  @Column() capacity: number;
  @Column({ type: 'int', nullable: true }) floor: number | null;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
}