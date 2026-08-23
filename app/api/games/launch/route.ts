import { NextResponse } from 'next/server';
import { getGameProvider } from '@/lib/games/registry';
import { getRealMoneyReadiness } from '@/lib/games/real-readiness';
import { readRealPlayerSession, validateRealPlayerEligibility } from '@/lib/auth/real-player-session';
import type { GameDevice, GameMode } from '@/lib/games/types';

const devices: GameDevice[] = ['mobile', 'desktop'];
const modes: GameMode[] = ['demo', 'real'];

function realSessionStatus(code: string) {
  if (['REAL_SESSION_REQUIRED', 'REAL_SESSION_INVALID', 'REAL_SESSION_EXPIRED'].includes(code)) return 401;
  return 403;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const gameId = typeof body?.gameId === 'string' ? body.gameId.trim() : '';
  const requestedMode = modes.includes(body?.mode) ? (body.mode as GameMode) : 'demo';
  const device = devices.includes(body?.device) ? (body.device as GameDevice) : 'mobile';
  const locale = typeof body?.locale === 'string' ? body.locale : 'pt-BR';
  const returnUrl = typeof body?.returnUrl === 'string' && body.returnUrl.startsWith('/') ? body.returnUrl : '/';

  if (!gameId) {
    return NextResponse.json({ error: 'gameId is required.' }, { status: 400 });
  }

  let playerId = typeof body?.playerId === 'string' ? body.playerId.trim() : '';

  if (requestedMode === 'real') {
    const readiness = getRealMoneyReadiness();
    if (!readiness.ready) {
      return NextResponse.json(
        {
          error: 'Real-money mode is not production-ready.',
          code: 'REAL_MODE_NOT_READY',
          missing: readiness.missing,
        },
        { status: 503 },
      );
    }

    try {
      const claims = validateRealPlayerEligibility(readRealPlayerSession(request));
      playerId = claims.sub;
    } catch (error) {
      const code = error instanceof Error ? error.message : 'REAL_SESSION_INVALID';
      return NextResponse.json({ error: 'Player is not eligible for real-money play.', code }, { status: realSessionStatus(code) });
    }
  }

  if (!playerId) {
    return NextResponse.json({ error: 'playerId is required for demo mode.' }, { status: 400 });
  }

  try {
    const aggregator = getGameProvider();

    if (requestedMode === 'real') {
      const games = await aggregator.listGames();
      const game = games.find((item) => item.id === gameId && item.enabled);
      if (!game) return NextResponse.json({ error: 'Game not found.' }, { status: 404 });
      if (!game.certified) {
        return NextResponse.json(
          { error: 'Game is not cleared for real-money play.', code: 'GAME_NOT_CERTIFIED' },
          { status: 403 },
        );
      }
    }

    const result = await aggregator.launchGame({
      gameId,
      playerId,
      mode: requestedMode,
      locale,
      currency: 'BRL',
      device,
      returnUrl,
    });

    return NextResponse.json({ integration: 'aggregator', provider: aggregator.id, ...result }, { status: 201 });
  } catch (error) {
    const code = error instanceof Error ? error.message : 'UNKNOWN_ERROR';
    const status = code === 'GAME_NOT_FOUND' ? 404 : code.includes('CREDENTIALS_MISSING') ? 503 : code.includes('ADAPTER_PENDING') ? 503 : 400;
    return NextResponse.json({ error: 'Unable to launch game.', code }, { status });
  }
}
