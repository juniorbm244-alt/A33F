import type { GameProviderAdapter } from './types';
import { MockGameProvider } from './mock-provider';
import { AggregatorGameProvider } from './aggregator-provider';
import { getRealMoneyReadiness } from './real-readiness';

const mockProvider = new MockGameProvider();
const aggregatorProvider = new AggregatorGameProvider();

export function getGameProvider(): GameProviderAdapter {
  const integration = (process.env.GAME_INTEGRATION ?? 'mock').trim().toLowerCase();

  if (integration === 'mock') return mockProvider;
  if (integration === 'aggregator') return aggregatorProvider;

  throw new Error(`GAME_INTEGRATION_UNKNOWN:${integration}`);
}

export function getGameIntegrationStatus() {
  const integration = (process.env.GAME_INTEGRATION ?? 'mock').trim().toLowerCase();
  const provider = integration === 'aggregator' ? aggregatorProvider : mockProvider;

  return {
    integration,
    provider: provider.id,
    configured: integration === 'mock' ? true : aggregatorProvider.configured,
    sandbox: provider.sandbox,
  };
}

export function isRealGameModeEnabled() {
  return getRealMoneyReadiness().ready;
}
