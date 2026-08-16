import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

const ACCESS_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

function cookieOptions(config: ConfigService, maxAge: number) {
  const isProd = config.get('NODE_ENV') === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    // Cross-site (different registrable domain) deployments need SameSite=None
    // to have the browser send the cookie at all; that requires Secure too,
    // which only works over HTTPS, so this only applies in production.
    sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
    path: '/',
  };
}

export function setAuthCookies(res: Response, config: ConfigService, accessToken: string, refreshToken: string): void {
  res.cookie('accessToken', accessToken, { ...cookieOptions(config, ACCESS_TOKEN_MAX_AGE_MS), maxAge: ACCESS_TOKEN_MAX_AGE_MS });
  res.cookie('refreshToken', refreshToken, { ...cookieOptions(config, REFRESH_TOKEN_MAX_AGE_MS), maxAge: REFRESH_TOKEN_MAX_AGE_MS });
}

export function clearAuthCookies(res: Response, config: ConfigService): void {
  res.clearCookie('accessToken', cookieOptions(config, 0));
  res.clearCookie('refreshToken', cookieOptions(config, 0));
}