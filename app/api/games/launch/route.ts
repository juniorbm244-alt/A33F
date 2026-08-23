import { NextResponse } from 'next/server';
import { getGameProvider, isRealGameModeEnabled } from '@/lib/games/registry';
import type { GameDevice, GameMode } from '@/lib/games/types';

const devices: GameDevice[] = ['mobile', 'desktop'];
const modes: GameMode[] = ['demo', 'real'];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const gameId = typeof body?.gameId === 'string' ? body.gameId.trim() : '';
  const playerId = typeof body?.playerId === 'string' ? body.playerId.trim() : '';
  const requestedMode = modes.includes(body?.mode) ? (body.mode as GameMode) : 'demo';
  const device = devices.includes(body?.device) ? (body.device as GameDevice) : 'mobile';
  const locale = typeof body?.locale === 'string' ? body.locale : 'pt-BR';
  const returnUrl = typeof body?.returnUrl === 'string' && body.returnUrl.startsWith('/') ? body.returnUrl : '/';

  if (!gameId || !playerId) {
    return NextResponse.json({ error: 'gameId and playerId are required.' }, { status: 400 });
  }

  if (requestedMode === 'real' && !isRealGameModeEnabled()) {
    return NextResponse.json(
      {
        error: 'Real-money game mode is disabled.',
        code: 'REAL_MODE_DISABLED',
        sandbox: true,
      },
      { status: 503 },
    );
  }

  try {
    const provider = getGameProvider();
    const result = await provider.launchGame({
      gameId,
      playerId,
      mode: requestedMode,
      locale,
      currency: 'BRL',
      device,
      returnUrl,
    });

    return NextResponse.json({ provider: provider.id, ...result }, { status: 201 });
  } catch (error) {
    const code = error instanceof Error ? error.message : 'UNKNOWN_ERROR';
    const status = code === 'GAME_NOT_FOUND' ? 404 : code === 'REAL_MODE_DISABLED' ? 503 : 400;
    return NextResponse.json({ error: 'Unable to launch game.', code }, { status });
  }
}
