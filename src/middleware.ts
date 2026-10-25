import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
import {routing} from './i18n/routing';

const BOT =
  /googlebot|bingbot|yandexbot|duckduckbot|baiduspider|slurp|facebookexternalhit|facebot|twitterbot|linkedinbot|embedly|pinterestbot|slackbot|vkshare|w3c_validator|redditbot|applebot|whatsapp|telegrambot|discordbot|semrushbot|ahrefsbot|petalbot|bytespider|crawler|spider/i;

const withDetection = createMiddleware(routing);
const withoutDetection = createMiddleware({
  ...routing,
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') ?? '';
  if (BOT.test(userAgent)) return withoutDetection(request);
  return withDetection(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
