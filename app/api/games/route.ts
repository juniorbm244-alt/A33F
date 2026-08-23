import { NextResponse } from 'next/server';
import { getGameProvider, getGameIntegrationStatus } from '@/lib/games/registry';
import type { GameCategory } from '@/lib/games/types';

const categories: GameCategory[] = ['slots', 'live', 'table', 'instant'];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const rawCategory = url.searchParams.get('category');
  const category = rawCategory && categories.includes(rawCategory as GameCategory)
    ? (rawCategory as GameCategory)
    : undefined;

  // In the single-aggregator model, `provider` is treated as the studio/content
  // provider inside the aggregator (e.g. Pragmatic, PG Soft, TaDa), not as a
  // separate technical integration.
  const studio = url.searchParams.get('provider') ?? undefined;
  const search = url.searchParams.get('search') ?? undefined;

  try {
    const gameProvider = getGameProvider();
    const games = await gameProvider.listGames({ category, provider: studio, search });

    return NextResponse.json({
      sandbox: gameProvider.sandbox,
      integration: getGameIntegrationStatus(),
      count: games.length,
      games,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR';
    return NextResponse.json({ error: 'Game catalog unavailable.', code: message }, { status: 503 });
  }
}
