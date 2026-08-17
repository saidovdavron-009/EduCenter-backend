import { Controller, Get } from '@nestjs/common';

// Public, guard-free endpoint — used both for manual uptime checks and by
// the self-ping in main.ts that keeps Render's free tier from sleeping.
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
