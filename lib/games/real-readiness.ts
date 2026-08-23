export interface ReadinessCheck {
  id: string;
  ready: boolean;
  label: string;
}

// Deliberately false until a real provider adapter and persistent real-money ledger
// are implemented and reviewed. Environment variables alone cannot bypass this gate.
export const REAL_MONEY_CODE_READY = false;

function yes(value: string | undefined) {
  return value?.trim().toLowerCase() === 'true';
}

function production(value: string | undefined) {
  return value?.trim().toLowerCase() === 'production';
}

export function getRealMoneyReadiness() {
  const provider = (process.env.GAME_PROVIDER ?? 'mock').trim().toLowerCase();
  const domain = (process.env.BETTING_OPERATOR_BRAND_DOMAIN ?? '').trim().toLowerCase();

  const checks: ReadinessCheck[] = [
    { id: 'code_integration', ready: REAL_MONEY_CODE_READY, label: 'Real provider adapter and persistent ledger reviewed' },
    { id: 'explicit_enable', ready: yes(process.env.REAL_MONEY_MODE_ENABLED), label: 'Real-money mode explicitly enabled' },
    { id: 'operator_authorized', ready: yes(process.env.BETTING_OPERATOR_AUTHORIZED), label: 'Operator authorization confirmed' },
    { id: 'bet_br_domain', ready: domain.endsWith('.bet.br'), label: 'Authorized .bet.br brand domain configured' },
    { id: 'provider_selected', ready: provider !== 'mock' && provider.length > 0, label: 'Non-mock game provider selected' },
    { id: 'provider_production', ready: production(process.env.GAME_PROVIDER_MODE), label: 'Game provider in production mode' },
    { id: 'provider_base_url', ready: Boolean(process.env.GAME_PROVIDER_BASE_URL), label: 'Game provider production URL configured' },
    { id: 'provider_api_key', ready: Boolean(process.env.GAME_PROVIDER_API_KEY), label: 'Game provider credential configured' },
    { id: 'provider_webhook_secret', ready: Boolean(process.env.GAME_PROVIDER_WEBHOOK_SECRET), label: 'Provider webhook signature secret configured' },
    { id: 'player_session_secret', ready: (process.env.A33F_PLAYER_SESSION_SECRET ?? '').length >= 32, label: 'Signed player session configured' },
    { id: 'database', ready: Boolean(process.env.DATABASE_URL), label: 'Persistent transactional database configured' },
    { id: 'ledger', ready: process.env.LEDGER_MODE === 'persistent', label: 'Persistent immutable ledger enabled' },
    { id: 'wallet', ready: production(process.env.WALLET_MODE), label: 'Real wallet integration enabled' },
    { id: 'kyc', ready: production(process.env.KYC_MODE), label: 'KYC/age/biometric verification enabled' },
    { id: 'geolocation', ready: production(process.env.GEOLOCATION_MODE), label: 'Production geolocation verification enabled' },
    { id: 'self_exclusion', ready: production(process.env.SELF_EXCLUSION_MODE), label: 'Central and operator self-exclusion checks enabled' },
    { id: 'prohibited_persons', ready: production(process.env.PROHIBITED_PERSONS_CHECK_MODE), label: 'Prohibited-person checks enabled' },
    { id: 'aml', ready: production(process.env.AML_MODE), label: 'AML monitoring enabled' },
    { id: 'responsible_limits', ready: yes(process.env.RESPONSIBLE_GAMING_LIMITS_REQUIRED), label: 'Mandatory loss/time limits enforced' },
    { id: 'game_certification', ready: yes(process.env.GAME_CERTIFICATION_ENFORCED), label: 'Only certified/SIGAP-cleared games allowed' },
  ];

  return {
    ready: checks.every((check) => check.ready),
    checks,
    missing: checks.filter((check) => !check.ready).map((check) => check.id),
  };
}
