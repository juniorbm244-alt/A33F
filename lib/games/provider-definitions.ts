export const providerDefinitions = [
  { id: 'mock', label: 'A33F Mock', envPrefix: 'MOCK', kind: 'mock' },
  { id: 'pragmatic', label: 'Pragmatic Play', envPrefix: 'PRAGMATIC', kind: 'direct' },
  { id: 'pgsoft', label: 'PG Soft', envPrefix: 'PGSOFT', kind: 'direct' },
  { id: 'tada', label: 'TaDa Gaming', envPrefix: 'TADA', kind: 'direct' },
  { id: 'aggregator', label: 'Game Aggregator', envPrefix: 'AGGREGATOR', kind: 'aggregator' },
] as const;

export type GameProviderId = (typeof providerDefinitions)[number]['id'];

export function isKnownProvider(value: string): value is GameProviderId {
  return providerDefinitions.some((provider) => provider.id === value);
}
