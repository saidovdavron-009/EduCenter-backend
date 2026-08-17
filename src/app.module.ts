import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import * as Joi from 'joi';
import { TypeormConfig } from '@config/typeorm.config';
import { HealthController } from './health.controller';
import { AuthModule } from '@features/auth/auth.module';
import { AdminsModule } from '@features/admins/admins.module';
import { StudentsModule } from '@features/students/students.module';
import { TeachersModule } from '@features/teachers/teachers.module';
import { GroupsModule } from '@features/groups/groups.module';
import { SubjectsModule } from '@features/subjects/subjects.module';
import { SchedulesModule } from '@features/schedules/schedules.module';
import { AttendanceModule } from '@features/attendance/attendance.module';
import { GradesModule } from '@features/grades/grades.module';
import { PaymentsModule } from '@features/payments/payments.module';
import { NotificationsModule } from '@features/notifications/notifications.module';
import { HomeworkModule } from '@features/homework/homework.module';
import { MaterialsModule } from '@features/materials/materials.module';
import { ReportsModule } from '@features/reports/reports.module';
import { ExpensesModule } from '@features/expenses/expenses.module';
import { BranchesModule } from '@features/branches/branches.module';
import { RoomsModule } from '@features/rooms/rooms.module';
import { ParentsModule } from '@features/parents/parents.module';
import { ContractsModule } from '@features/contracts/contracts.module';
import { TasksModule } from '@features/tasks/tasks.module';
import { TeacherAttendanceModule } from '@features/teacher-attendance/teacher-attendance.module';
import { StaffSalariesModule } from '@features/staff-salaries/staff-salaries.module';
import { DiscountsModule } from '@features/discounts/discounts.module';
import { LeadsModule } from '@features/leads/leads.module';
import { InventoryModule } from '@features/inventory/inventory.module';
import { QuizzesModule } from '@features/quizzes/quizzes.module';
import { SettingsModule } from '@features/settings/settings.module';
import { UploadsModule } from '@features/uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().default(3001),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_ACCESS_SECRET: Joi.string().min(16).required(),
        JWT_REFRESH_SECRET: Joi.string().min(16).required(),
        JWT_ACCESS_EXPIRES_IN: Joi.string().default('7d'),
        JWT_REFRESH_EXPIRES_IN: Joi.string().default('30d'),
        SUPERADMIN_LOGIN_ID: Joi.string().required(),
        SUPERADMIN_PASSWORD: Joi.string().min(4).required(),
      }),
      validationOptions: { abortEarly: true },
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    TypeormConfig,
    AuthModule,
    AdminsModule,
    StudentsModule,
    TeachersModule,
    GroupsModule,
    SubjectsModule,
    SchedulesModule,
    AttendanceModule,
    GradesModule,
    PaymentsModule,
    NotificationsModule,
    HomeworkModule,
    MaterialsModule,
    ReportsModule,
    ExpensesModule,
    BranchesModule,
    RoomsModule,
    ParentsModule,
    ContractsModule,
    TasksModule,
    TeacherAttendanceModule,
    StaffSalariesModule,
    DiscountsModule,
    LeadsModule,
    InventoryModule,
    QuizzesModule,
    SettingsModule,
    UploadsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}