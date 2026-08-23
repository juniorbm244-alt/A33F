import type {
  CasinoGame,
  GameCatalogFilter,
  GameProviderAdapter,
  LaunchGameInput,
  LaunchGameResult,
} from './types';

function env(name: string) {
  return process.env[name]?.trim() ?? '';
}

export class AggregatorGameProvider implements GameProviderAdapter {
  readonly id = 'aggregator';

  get sandbox() {
    return env('AGGREGATOR_MODE').toLowerCase() !== 'production';
  }

  get configured() {
    return Boolean(env('AGGREGATOR_BASE_URL') && env('AGGREGATOR_API_KEY'));
  }

  async listGames(_filter?: GameCatalogFilter): Promise<CasinoGame[]> {
    if (!this.configured) return [];

    // The real request mapping is intentionally added only after the contracted
    // aggregator provides its official API documentation and credentials.
    throw new Error('AGGREGATOR_ADAPTER_PENDING');
  }

  async launchGame(_input: LaunchGameInput): Promise<LaunchGameResult> {
    if (!this.configured) throw new Error('AGGREGATOR_CREDENTIALS_MISSING');
    throw new Error('AGGREGATOR_ADAPTER_PENDING');
  }
}
