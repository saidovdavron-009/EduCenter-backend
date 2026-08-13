import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Student } from '../students/entities/student.entity';
import { StudentParent } from '../parents/entities/parent.entity';
import { PaymentsController } from './payments.controller';
import { CreatePaymentHandler } from './commands/create/handler';
import { UpdatePaymentHandler } from './commands/update/handler';
import { DeletePaymentHandler } from './commands/delete/handler';
import { GetAllPaymentsHandler } from './queries/get-all/handler';
import { GetOnePaymentHandler } from './queries/get-one/handler';
import { GetPaymentDashboardHandler } from './queries/get-dashboard/handler';
import { GetPaymentReportHandler } from './queries/get-report/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Student, StudentParent])],
  controllers: [PaymentsController],
  providers: [CreatePaymentHandler, UpdatePaymentHandler, DeletePaymentHandler, GetAllPaymentsHandler, GetOnePaymentHandler, GetPaymentDashboardHandler, GetPaymentReportHandler],
  exports: [TypeOrmModule],
})
export class PaymentsModule {}