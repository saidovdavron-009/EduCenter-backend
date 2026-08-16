import 'dotenv/config';
import { DataSource } from 'typeorm';

// Mirrors src/config/typeorm.config.ts's connection resolution — the Nest
// app connects via the individual DB_HOST/PORT/... vars, so this CLI-only
// data source (used for migrations) must match or it silently falls back
// to localhost:5432 in environments (e.g. Render) that only set those.
export const AppDataSource = new DataSource(
  process.env.DB_URL
    ? {
        type: 'postgres',
        url: process.env.DB_URL,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        synchronize: false,
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/migrations/*.js'],
      }
    : {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'educenter',
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        synchronize: false,
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/migrations/*.js'],
      },
);
