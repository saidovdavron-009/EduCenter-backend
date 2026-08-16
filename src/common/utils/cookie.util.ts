import { Request, Response } from 'express';

const ACCESS_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

function cookieOptions(req: Request, maxAge: number) {
  // Driven by the actual request protocol (req.secure, which needs
  // `app.set('trust proxy', 1)` in main.ts to read X-Forwarded-Proto behind
  // Render's proxy) rather than NODE_ENV — NODE_ENV defaults to
  // 'development' (app.module.ts Joi schema) whenever a host simply never
  // sets it, which silently downgraded deployed cookies to insecure/Lax and
  // broke cross-site login. HTTPS requests always get Secure + SameSite=None
  // (required for the browser to send the cookie back to a different-domain
  // frontend); plain HTTP (local dev) gets Lax without Secure.
  const isHttps = req.secure;
  return {
    httpOnly: true,
    secure: isHttps,
    sameSite: (isHttps ? 'none' : 'lax') as 'none' | 'lax',
    path: '/',
  };
}

export function setAuthCookies(res: Response, req: Request, accessToken: string, refreshToken: string): void {
  res.cookie('accessToken', accessToken, { ...cookieOptions(req, ACCESS_TOKEN_MAX_AGE_MS), maxAge: ACCESS_TOKEN_MAX_AGE_MS });
  res.cookie('refreshToken', refreshToken, { ...cookieOptions(req, REFRESH_TOKEN_MAX_AGE_MS), maxAge: REFRESH_TOKEN_MAX_AGE_MS });
}

export function clearAuthCookies(res: Response, req: Request): void {
  res.clearCookie('accessToken', cookieOptions(req, 0));
  res.clearCookie('refreshToken', cookieOptions(req, 0));
}
