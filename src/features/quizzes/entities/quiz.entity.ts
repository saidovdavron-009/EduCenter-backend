import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'group_id', type: 'uuid' }) groupId: string;
  @Column() title: string;
  @Column({ type: 'text', nullable: true }) description: string;
  @Column({ name: 'time_limit_mins', nullable: true }) timeLimitMins: number;
  @Column({ name: 'is_published', default: false }) isPublished: boolean;
  @Column({ name: 'start_at', type: 'timestamptz', nullable: true }) startAt: Date;
  @Column({ name: 'end_at', type: 'timestamptz', nullable: true }) endAt: Date;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}

@Entity('quiz_questions')
export class QuizQuestion {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'quiz_id', type: 'uuid' }) quizId: string;
  @Column({ name: 'question_text', type: 'text' }) questionText: string;
  @Column({ name: 'image_url', nullable: true }) imageUrl: string;
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 1 }) points: number;
  @Column({ name: 'sort_order', default: 0 }) sortOrder: number;
}

@Entity('quiz_options')
export class QuizOption {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'question_id', type: 'uuid' }) questionId: string;
  @Column({ name: 'option_text', type: 'text' }) optionText: string;
  @Column({ name: 'is_correct', default: false }) isCorrect: boolean;
}

@Entity('quiz_results')
export class QuizResult {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'quiz_id', type: 'uuid' }) quizId: string;
  @Column({ name: 'student_id', type: 'uuid' }) studentId: string;
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 }) score: number;
  @Column({ name: 'max_score', type: 'decimal', precision: 5, scale: 2, nullable: true }) maxScore: number;
  @Column({ name: 'started_at', type: 'timestamptz', nullable: true }) startedAt: Date;
  @Column({ name: 'finished_at', type: 'timestamptz', nullable: true }) finishedAt: Date;
}