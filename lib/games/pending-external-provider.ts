import type {
  CasinoGame,
  GameCatalogFilter,
  GameProviderAdapter,
  LaunchGameInput,
  LaunchGameResult,
} from './types';

export interface ExternalProviderConfig {
  id: string;
  label: string;
  envPrefix: string;
}

function env(name: string) {
  return process.env[name]?.trim() ?? '';
}

export class PendingExternalGameProvider implements GameProviderAdapter {
  readonly id: string;
  readonly label: string;
  readonly envPrefix: string;

  constructor(config: ExternalProviderConfig) {
    this.id = config.id;
    this.label = config.label;
    this.envPrefix = config.envPrefix;
  }

  get sandbox() {
    return env(`${this.envPrefix}_MODE`).toLowerCase() !== 'production';
  }

  get configured() {
    return Boolean(env(`${this.envPrefix}_BASE_URL`) && env(`${this.envPrefix}_API_KEY`));
  }

  async listGames(_filter?: GameCatalogFilter): Promise<CasinoGame[]> {
    if (!this.configured) return [];
    throw new Error(`PROVIDER_ADAPTER_PENDING:${this.id}`);
  }

  async launchGame(_input: LaunchGameInput): Promise<LaunchGameResult> {
    if (!this.configured) throw new Error(`PROVIDER_CREDENTIALS_MISSING:${this.id}`);
    throw new Error(`PROVIDER_ADAPTER_PENDING:${this.id}`);
  }
}
