import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('parents')
export class Parent {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'user_id', nullable: true, unique: true, type: 'uuid' }) userId: string;
  @Column({ name: 'full_name' }) fullName: string;
  @Column() phone: string;
  @Column({ unique: true, nullable: true }) email: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}

@Entity('student_parents')
export class StudentParent {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'student_id', type: 'uuid' }) studentId: string;
  @Column({ name: 'parent_id', type: 'uuid' }) parentId: string;
}