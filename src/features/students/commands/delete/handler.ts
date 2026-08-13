import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Student } from '../../entities/student.entity';
import { User } from '../../../auth/entities/user.entity';
import { DeleteStudentResponse } from './response';

@Injectable()
export class DeleteStudentHandler {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async execute(id: string): Promise<DeleteStudentResponse> {
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) throw new NotFoundException('O\'quvchi topilmadi');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(Student, { id });
      await queryRunner.manager.update(User, { id: student.userId }, { isActive: false });
      await queryRunner.commitTransaction();
      return { message: 'O\'quvchi muvaffaqiyatli o\'chirildi' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}