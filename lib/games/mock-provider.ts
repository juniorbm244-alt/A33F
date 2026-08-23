import type {
  CasinoGame,
  GameCatalogFilter,
  GameProviderAdapter,
  LaunchGameInput,
  LaunchGameResult,
} from './types';

const games: CasinoGame[] = [
  { id: 'sweet-rush', provider: 'a33f-mock', providerGameId: 'mock_sweet_rush', title: 'Sweet Rush', category: 'slots', demoAvailable: true, certified: false, enabled: true },
  { id: 'gates-of-glory', provider: 'a33f-mock', providerGameId: 'mock_gates_glory', title: 'Gates of Glory', category: 'slots', demoAvailable: true, certified: false, enabled: true },
  { id: 'neon-roulette', provider: 'a33f-mock', providerGameId: 'mock_neon_roulette', title: 'Neon Roulette', category: 'live', demoAvailable: true, certified: false, enabled: true },
  { id: 'lucky-dragon', provider: 'a33f-mock', providerGameId: 'mock_lucky_dragon', title: 'Lucky Dragon', category: 'slots', demoAvailable: true, certified: false, enabled: true },
  { id: 'blackjack-elite', provider: 'a33f-mock', providerGameId: 'mock_blackjack_elite', title: 'Blackjack Elite', category: 'table', demoAvailable: true, certified: false, enabled: true },
  { id: 'diamond-spin', provider: 'a33f-mock', providerGameId: 'mock_diamond_spin', title: 'Diamond Spin', category: 'instant', demoAvailable: true, certified: false, enabled: true },
];

function applyFilter(filter?: GameCatalogFilter) {
  if (!filter) return games;
  const search = filter.search?.trim().toLowerCase();
  return games.filter((game) => {
    if (filter.category && game.category !== filter.category) return false;
    if (filter.provider && game.provider !== filter.provider) return false;
    if (search && !game.title.toLowerCase().includes(search)) return false;
    return true;
  });
}

export class MockGameProvider implements GameProviderAdapter {
  readonly id = 'mock';
  readonly sandbox = true;

  async listGames(filter?: GameCatalogFilter) {
    return applyFilter(filter).filter((game) => game.enabled);
  }

  async launchGame(input: LaunchGameInput): Promise<LaunchGameResult> {
    if (input.mode !== 'demo') {
      throw new Error('REAL_MODE_DISABLED');
    }

    const game = games.find((item) => item.id === input.gameId && item.enabled);
    if (!game) throw new Error('GAME_NOT_FOUND');
    if (!game.demoAvailable) throw new Error('DEMO_NOT_AVAILABLE');

    const sessionId = `game_demo_${crypto.randomUUID()}`;
    const params = new URLSearchParams({
      session: sessionId,
      player: input.playerId,
      returnUrl: input.returnUrl,
    });

    return {
      sessionId,
      launchUrl: `/jogos/demo/${encodeURIComponent(game.id)}?${params.toString()}`,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      mode: 'demo',
      sandbox: true,
    };
  }
}
