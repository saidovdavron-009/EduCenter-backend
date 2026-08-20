import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GenerateLessonSessionsHandler } from '../commands/generate/handler';

// Har oy boshida (1-sanada) shu oy uchun, va har hafta boshida (dushanba)
// joriy hafta uchun lesson_sessions avtomatik generatsiya qilinadi. Ikkalasi
// ham idempotent (mavjud group_id+date juftliklarini qayta yaratmaydi), shuning
// uchun oy o'rtasida qo'shilgan yangi guruh/schedule ham haftalik yugurish
// bilan avtomatik qamrab olinadi.
@Injectable()
export class LessonSessionCronService {
  private readonly logger = new Logger(LessonSessionCronService.name);

  constructor(private readonly generateHandler: GenerateLessonSessionsHandler) {}

  @Cron('0 5 1 * *')
  async generateForMonth() {
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);

    const result = await this.generateHandler.execute({ periodStart, periodEnd });
    this.logger.log(`Oylik generatsiya (${periodStart}..${periodEnd}): ${result.message}`);
  }

  @Cron('0 5 * * 1')
  async generateForWeek() {
    const now = new Date();
    const day = now.getDay();
    const diffToMonday = (day + 6) % 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - diffToMonday);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const periodStart = monday.toISOString().slice(0, 10);
    const periodEnd = sunday.toISOString().slice(0, 10);

    const result = await this.generateHandler.execute({ periodStart, periodEnd });
    this.logger.log(`Haftalik generatsiya (${periodStart}..${periodEnd}): ${result.message}`);
  }
}
