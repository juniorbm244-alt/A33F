import { NextResponse } from 'next/server';
import { getConfiguredGameProviders, getGameProvider, getProviderStatuses } from '@/lib/games/registry';
import type { GameCategory } from '@/lib/games/types';

const categories: GameCategory[] = ['slots', 'live', 'table', 'instant'];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const rawCategory = url.searchParams.get('category');
  const category = rawCategory && categories.includes(rawCategory as GameCategory)
    ? (rawCategory as GameCategory)
    : undefined;

  const requestedProvider = url.searchParams.get('provider')?.trim().toLowerCase() || undefined;
  const search = url.searchParams.get('search') ?? undefined;

  try {
    const selectedProviders = requestedProvider
      ? [getGameProvider(requestedProvider)]
      : getConfiguredGameProviders();

    const results = await Promise.all(
      selectedProviders.map(async (provider) => {
        try {
          const games = await provider.listGames({ category, search });
          return { provider: provider.id, sandbox: provider.sandbox, games, error: null as string | null };
        } catch (error) {
          return {
            provider: provider.id,
            sandbox: provider.sandbox,
            games: [],
            error: error instanceof Error ? error.message : 'UNKNOWN_PROVIDER_ERROR',
          };
        }
      }),
    );

    const games = results.flatMap((result) => result.games);

    return NextResponse.json({
      sandbox: results.every((result) => result.sandbox),
      count: games.length,
      games,
      sources: results.map(({ provider, sandbox, error }) => ({ provider, sandbox, error })),
      providers: getProviderStatuses(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR';
    return NextResponse.json({ error: 'Game catalog unavailable.', code: message }, { status: 503 });
  }
}
