import {NestFactory, Reflector} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {ValidationPipe, ClassSerializerInterceptor} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {DataSource} from 'typeorm';
import {join} from 'path';
import axios from 'axios';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import {AppModule} from './app.module';
import {AllExceptionsFilter} from '@common/filters/http-exception.filter';
import {ResponseInterceptor} from '@common/interceptors/response.interceptor';
import {seedSuperAdmin} from '@common/utils/superadmin-seed.util';
import {configureSwagger} from '@config/swagger.config';

const SELF_PING_INTERVAL_MS = 2 * 60 * 1000;

// Render's free tier spins the service down after 15 minutes with no inbound
// HTTP traffic. A self-ping every 2 minutes to the service's own public URL
// keeps it awake — pinging localhost wouldn't count, since Render only
// tracks requests that actually go through its edge. RENDER_EXTERNAL_URL is
// set automatically by Render; SELF_PING_URL is an explicit override for
// other hosts. If neither is set (e.g. local dev), this does nothing.
function startSelfPing(config: ConfigService) {
    const baseUrl = config.get<string>('SELF_PING_URL') || config.get<string>('RENDER_EXTERNAL_URL');
    if (!baseUrl) return;

    const url = `${baseUrl.replace(/\/+$/, '')}/api/v1/health`;
    setInterval(() => {
        axios.get(url, {timeout: 10000}).catch(() => {
            // Best-effort — a failed ping just means we skip this cycle, not fatal.
        });
    }, SELF_PING_INTERVAL_MS);
    console.log(`⏰ Self-ping enabled: ${url} every ${SELF_PING_INTERVAL_MS / 60000} min`);
}

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {logger: ['error', 'warn', 'log']});
    const config = app.get(ConfigService);
    const port = config.get<number>('PORT', 3004);

    // Render (and most hosts) terminate TLS at a proxy and forward plain HTTP
    // internally, so req.secure is false unless we trust their X-Forwarded-Proto
    // header. Cookie security (see cookie.util.ts) depends on this being correct.
    app.set('trust proxy', 1);

    app.useStaticAssets(join(process.cwd(), 'uploads'), {prefix: '/uploads/'});

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
            transformOptions: {enableImplicitConversion: true},
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

    startSelfPing(config);
}

bootstrap();