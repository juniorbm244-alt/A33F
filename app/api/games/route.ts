import { NextResponse } from 'next/server';
import { getGameProvider } from '@/lib/games/registry';
import type { GameCategory } from '@/lib/games/types';

const categories: GameCategory[] = ['slots', 'live', 'table', 'instant'];

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const rawCategory = url.searchParams.get('category');
    const category = rawCategory && categories.includes(rawCategory as GameCategory)
      ? (rawCategory as GameCategory)
      : undefined;

    const provider = url.searchParams.get('provider') ?? undefined;
    const search = url.searchParams.get('search') ?? undefined;
    const gameProvider = getGameProvider();
    const games = await gameProvider.listGames({ category, provider, search });

    return NextResponse.json({
      sandbox: gameProvider.sandbox,
      provider: gameProvider.id,
      count: games.length,
      games,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR';
    return NextResponse.json({ error: 'Game catalog unavailable.', code: message }, { status: 503 });
  }
}
