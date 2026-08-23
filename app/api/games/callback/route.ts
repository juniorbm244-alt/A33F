import { NextResponse } from 'next/server';
import { verifyProviderSignature } from '@/lib/games/signature';
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

  if (!process.env.GAME_PROVIDER_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Provider callback is not configured.', code: 'WEBHOOK_SECRET_MISSING' },
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
    typeof payload.provider !== 'string' ||
    typeof payload.playerId !== 'string' ||
    typeof payload.gameId !== 'string'
  ) {
    return NextResponse.json({ error: 'Invalid callback payload.' }, { status: 400 });
  }

  // Intentionally no real-money ledger mutation here.
  // Provider-specific transaction processing will be added only after
  // authorization, certification, idempotency and persistent ledger are ready.
  return NextResponse.json({
    accepted: true,
    sandbox: true,
    eventId: payload.eventId,
    event: payload.event,
  });
}
