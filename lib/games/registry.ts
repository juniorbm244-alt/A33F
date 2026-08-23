import type { GameProviderAdapter } from './types';
import { MockGameProvider } from './mock-provider';

const mockProvider = new MockGameProvider();

export function getGameProvider(): GameProviderAdapter {
  const configured = (process.env.GAME_PROVIDER ?? 'mock').trim().toLowerCase();

  if (configured === 'mock') return mockProvider;

  throw new Error(`GAME_PROVIDER_NOT_CONFIGURED:${configured}`);
}

export function isRealGameModeEnabled() {
  return process.env.GAME_PROVIDER_MODE === 'production' && process.env.GAME_PROVIDER !== 'mock';
}
