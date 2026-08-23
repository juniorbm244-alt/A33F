import { NextResponse } from 'next/server';
import { getRealMoneyReadiness } from '@/lib/games/real-readiness';

export async function GET() {
  const readiness = getRealMoneyReadiness();

  return NextResponse.json(
    {
      realMoneyMode: readiness.ready ? 'ready' : 'blocked',
      ready: readiness.ready,
      missing: readiness.missing,
      checks: readiness.checks,
    },
    {
      headers: {
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex',
      },
    },
  );
}
