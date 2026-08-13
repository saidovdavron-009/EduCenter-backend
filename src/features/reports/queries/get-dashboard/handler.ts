import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../../students/entities/student.entity';

@Injectable()
export class GetDashboardHandler {
  constructor(@InjectRepository(Student) private readonly studentRepo: Repository<Student>) {}

  async execute() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const today = now.toISOString().split('T')[0];

    const [
      studentStats, teacherCount, groupCount,
      monthlyRevenue, pendingPayments,
      todayAttendance, totalAttendance,
    ] = await Promise.all([
      this.studentRepo.query(
        `SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status='ACTIVE') as active FROM students`,
      ),
      this.studentRepo.query(`SELECT COUNT(*) FROM teachers WHERE is_active = true`),
      this.studentRepo.query(`SELECT COUNT(*) FROM groups WHERE status != 'CLOSED'`),
      this.studentRepo.query(
        `SELECT COALESCE(SUM(amount - discount), 0) as total FROM payments WHERE status='PAID' AND month=$1 AND year=$2`,
        [month, year],
      ),
      this.studentRepo.query(
        `SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status='PENDING'`,
      ),
      this.studentRepo.query(
        `SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status='PRESENT') as present FROM attendances WHERE date=$1`,
        [today],
      ),
      this.studentRepo.query(
        `SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status IN ('PRESENT','LATE')) as present FROM attendances`,
      ),
    ]);

    const todayTotal = parseInt(todayAttendance[0]?.total || '0');
    const todayPresent = parseInt(todayAttendance[0]?.present || '0');
    const allTotal = parseInt(totalAttendance[0]?.total || '0');
    const allPresent = parseInt(totalAttendance[0]?.present || '0');

    return {
      totalStudents: parseInt(studentStats[0]?.total || '0'),
      activeStudents: parseInt(studentStats[0]?.active || '0'),
      totalTeachers: parseInt(teacherCount[0]?.count || '0'),
      totalGroups: parseInt(groupCount[0]?.count || '0'),
      monthlyRevenue: parseFloat(monthlyRevenue[0]?.total || '0'),
      pendingPayments: parseFloat(pendingPayments[0]?.total || '0'),
      todayAttendanceRate: todayTotal > 0 ? Math.round((todayPresent / todayTotal) * 100) : 0,
      totalAttendanceRate: allTotal > 0 ? Math.round((allPresent / allTotal) * 100) : 0,
      recentActivities: [],
    };
  }
}