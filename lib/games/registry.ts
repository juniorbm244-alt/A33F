import type { GameProviderAdapter } from './types';
import { MockGameProvider } from './mock-provider';
import { PendingExternalGameProvider } from './pending-external-provider';
import { providerDefinitions, isKnownProvider, type GameProviderId } from './provider-definitions';
import { getRealMoneyReadiness } from './real-readiness';

const providers = new Map<GameProviderId, GameProviderAdapter>();

for (const definition of providerDefinitions) {
  if (definition.id === 'mock') {
    providers.set('mock', new MockGameProvider());
    continue;
  }

  providers.set(
    definition.id,
    new PendingExternalGameProvider({
      id: definition.id,
      label: definition.label,
      envPrefix: definition.envPrefix,
    }),
  );
}

function configuredProviderIds() {
  const raw = (process.env.GAME_PROVIDERS ?? process.env.GAME_PROVIDER ?? 'mock')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  const ids = raw.filter(isKnownProvider);
  return ids.length > 0 ? ids : ['mock'];
}

export function getGameProvider(providerId?: string): GameProviderAdapter {
  const requested = (providerId ?? '').trim().toLowerCase();
  if (requested) {
    if (!isKnownProvider(requested)) throw new Error(`GAME_PROVIDER_UNKNOWN:${requested}`);
    const provider = providers.get(requested);
    if (!provider) throw new Error(`GAME_PROVIDER_NOT_CONFIGURED:${requested}`);
    return provider;
  }

  const first = configuredProviderIds()[0];
  const provider = providers.get(first);
  if (!provider) throw new Error(`GAME_PROVIDER_NOT_CONFIGURED:${first}`);
  return provider;
}

export function getConfiguredGameProviders() {
  return configuredProviderIds()
    .map((id) => providers.get(id))
    .filter((provider): provider is GameProviderAdapter => Boolean(provider));
}

export function getProviderStatuses() {
  const enabled = new Set(configuredProviderIds());

  return providerDefinitions.map((definition) => {
    const provider = providers.get(definition.id);
    const configured = definition.id === 'mock'
      ? true
      : Boolean(
          process.env[`${definition.envPrefix}_BASE_URL`]?.trim() &&
          process.env[`${definition.envPrefix}_API_KEY`]?.trim(),
        );

    return {
      id: definition.id,
      label: definition.label,
      kind: definition.kind,
      enabled: enabled.has(definition.id),
      configured,
      sandbox: provider?.sandbox ?? true,
      adapterReady: definition.id === 'mock',
    };
  });
}

export function isRealGameModeEnabled() {
  return getRealMoneyReadiness().ready;
}
