import { NextResponse } from 'next/server';
import { verifyProviderSignature } from '@/lib/games/signature';
import { getRealMoneyReadiness } from '@/lib/games/real-readiness';
import type { ProviderCallbackPayload } from '@/lib/games/types';

const allowedEvents = new Set([
  'session.started',
  'bet.created',
  'win.created',
  'transaction.rollback',
]);

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-game-signature');
  const productionMode = process.env.AGGREGATOR_MODE === 'production';

  if (!process.env.AGGREGATOR_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Aggregator callback is not configured.', code: 'WEBHOOK_SECRET_MISSING' },
      { status: 503 },
    );
  }

  if (!verifyProviderSignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
  }

  const payload = (() => {
    try {
      return JSON.parse(rawBody) as Partial<ProviderCallbackPayload>;
    } catch {
      return null;
    }
  })();

  if (
    !payload ||
    typeof payload.eventId !== 'string' ||
    typeof payload.event !== 'string' ||
    !allowedEvents.has(payload.event) ||
    typeof payload.playerId !== 'string' ||
    typeof payload.gameId !== 'string'
  ) {
    return NextResponse.json({ error: 'Invalid callback payload.' }, { status: 400 });
  }

  if (payload.amountCents !== undefined && (!Number.isInteger(payload.amountCents) || payload.amountCents < 0)) {
    return NextResponse.json({ error: 'Invalid callback amount.' }, { status: 400 });
  }

  if (payload.currency !== undefined && payload.currency !== 'BRL') {
    return NextResponse.json({ error: 'Unsupported callback currency.' }, { status: 400 });
  }

  if (productionMode) {
    const readiness = getRealMoneyReadiness();
    if (!readiness.ready) {
      return NextResponse.json(
        { error: 'Real-money callback processing is blocked.', code: 'REAL_MODE_NOT_READY', missing: readiness.missing },
        { status: 503 },
      );
    }
  }

  // Sandbox acknowledges signed aggregator events without moving real funds.
  // Production must write idempotently to the persistent immutable ledger
  // before acknowledging bet/win/rollback events.
  return NextResponse.json({
    accepted: true,
    sandbox: !productionMode,
    eventId: payload.eventId,
    event: payload.event,
  });
}
