import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { join } from 'path';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from '@common/filters/http-exception.filter';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { seedSuperAdmin } from '@common/utils/superadmin-seed.util';
import { configureSwagger } from '@config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: ['error', 'warn', 'log'] });
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 3000);

  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads/' });

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          connectSrc: ["'self'"],
        },
      },
    }),
  );
  app.use(compression());
  app.use(cookieParser());

  const corsOrigin = config.get('CORS_ORIGIN', '*');
  app.enableCors({
    origin: corsOrigin === '*' ? '*' : corsOrigin.split(',').map((o: string) => o.trim()),
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  configureSwagger(app);

  await seedSuperAdmin(app.get(DataSource), config);

  await app.listen(port);
  console.log(`\n✅ Server: http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger: http://localhost:${port}/docs\n`);
}

bootstrap();