import type { GameProviderAdapter } from './types';
import { MockGameProvider } from './mock-provider';
import { getRealMoneyReadiness } from './real-readiness';

const mockProvider = new MockGameProvider();

export function getGameProvider(): GameProviderAdapter {
  const configured = (process.env.GAME_PROVIDER ?? 'mock').trim().toLowerCase();

  if (configured === 'mock') return mockProvider;

  throw new Error(`GAME_PROVIDER_NOT_CONFIGURED:${configured}`);
}

export function isRealGameModeEnabled() {
  return getRealMoneyReadiness().ready;
}
