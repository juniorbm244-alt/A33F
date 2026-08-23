export type GameCategory = 'slots' | 'live' | 'table' | 'instant';
export type GameMode = 'demo' | 'real';
export type GameDevice = 'mobile' | 'desktop';

export interface CasinoGame {
  id: string;
  provider: string;
  providerGameId: string;
  title: string;
  category: GameCategory;
  thumbnailUrl?: string;
  demoAvailable: boolean;
  certified: boolean;
  enabled: boolean;
}

export interface GameCatalogFilter {
  category?: GameCategory;
  provider?: string;
  search?: string;
}

export interface LaunchGameInput {
  gameId: string;
  playerId: string;
  mode: GameMode;
  locale: string;
  currency: 'BRL';
  device: GameDevice;
  returnUrl: string;
}

export interface LaunchGameResult {
  sessionId: string;
  launchUrl: string;
  expiresAt: string;
  mode: GameMode;
  sandbox: boolean;
}

export interface GameProviderAdapter {
  readonly id: string;
  readonly sandbox: boolean;
  listGames(filter?: GameCatalogFilter): Promise<CasinoGame[]>;
  launchGame(input: LaunchGameInput): Promise<LaunchGameResult>;
}

export type ProviderCallbackEvent =
  | 'session.started'
  | 'bet.created'
  | 'win.created'
  | 'transaction.rollback';

export interface ProviderCallbackPayload {
  eventId: string;
  event: ProviderCallbackEvent;
  provider: string;
  playerId: string;
  gameId: string;
  transactionId?: string;
  amountCents?: number;
  currency?: 'BRL';
  occurredAt: string;
}
