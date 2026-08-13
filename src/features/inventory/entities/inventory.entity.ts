import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { InventoryLogType } from '../../../common/types';

@Entity('inventory_items')
export class InventoryItem {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'branch_id', type: 'uuid' }) branchId: string;
  @Column() name: string;
  @Column({ nullable: true, unique: true }) sku: string;
  @Column({ type: 'text', nullable: true }) description: string;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) price: number;
  @Column({ name: 'stock_quantity', default: 0 }) stockQuantity: number;
  @Column({ name: 'min_stock_level', default: 5 }) minStockLevel: number;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
}

@Entity('inventory_logs')
export class InventoryLog {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'item_id', type: 'uuid' }) itemId: string;
  @Column({ type: 'enum', enum: InventoryLogType }) type: InventoryLogType;
  @Column() quantity: number;
  @Column({ nullable: true }) reason: string;
  @Column({ name: 'action_by', nullable: true, type: 'uuid' }) actionBy: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}

@Entity('book_sales')
export class BookSale {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'student_id', type: 'uuid' }) studentId: string;
  @Column({ name: 'item_id', type: 'uuid' }) itemId: string;
  @Column({ default: 1 }) quantity: number;
  @Column({ type: 'decimal', precision: 12, scale: 2 }) amount: number;
  @Column({ name: 'sold_by', nullable: true, type: 'uuid' }) soldBy: string;
  @CreateDateColumn({ name: 'sold_at' }) soldAt: Date;
}