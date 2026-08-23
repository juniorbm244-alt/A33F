import { createHmac, timingSafeEqual } from 'crypto';

export interface RealPlayerSessionClaims {
  sub: string;
  iat: number;
  exp: number;
  ageVerified: boolean;
  kycVerified: boolean;
  biometricVerified: boolean;
  centrallyExcluded: boolean;
  selfExcluded: boolean;
  prohibitedPerson: boolean;
  geolocationVerifiedAt: string;
  geolocationCountry: string;
  geolocationAssurance: 'multisource' | 'device';
  lossLimitCents: number;
  timeLimitMinutes: number;
  responsibleGamingAcceptedAt: string;
}

function signPart(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

function decodeClaims(value: string): RealPlayerSessionClaims {
  const raw = Buffer.from(value, 'base64url').toString('utf8');
  return JSON.parse(raw) as RealPlayerSessionClaims;
}

export function readRealPlayerSession(request: Request): RealPlayerSessionClaims {
  const secret = process.env.A33F_PLAYER_SESSION_SECRET ?? '';
  if (secret.length < 32) throw new Error('REAL_SESSION_SECRET_NOT_CONFIGURED');

  const auth = request.headers.get('authorization') ?? '';
  if (!auth.startsWith('Bearer ')) throw new Error('REAL_SESSION_REQUIRED');

  const token = auth.slice(7).trim();
  const [payloadPart, signaturePart, extra] = token.split('.');
  if (!payloadPart || !signaturePart || extra) throw new Error('REAL_SESSION_INVALID');

  const expected = Buffer.from(signPart(payloadPart, secret));
  const supplied = Buffer.from(signaturePart);
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
    throw new Error('REAL_SESSION_INVALID');
  }

  let claims: RealPlayerSessionClaims;
  try {
    claims = decodeClaims(payloadPart);
  } catch {
    throw new Error('REAL_SESSION_INVALID');
  }

  const now = Math.floor(Date.now() / 1000);
  if (!claims.sub || !Number.isFinite(claims.exp) || claims.exp <= now) throw new Error('REAL_SESSION_EXPIRED');
  if (!Number.isFinite(claims.iat) || claims.iat > now + 60) throw new Error('REAL_SESSION_INVALID');

  return claims;
}

export function validateRealPlayerEligibility(claims: RealPlayerSessionClaims) {
  if (!claims.ageVerified) throw new Error('AGE_NOT_VERIFIED');
  if (!claims.kycVerified) throw new Error('KYC_NOT_VERIFIED');
  if (!claims.biometricVerified) throw new Error('BIOMETRIC_NOT_VERIFIED');
  if (claims.selfExcluded || claims.centrallyExcluded) throw new Error('PLAYER_SELF_EXCLUDED');
  if (claims.prohibitedPerson) throw new Error('PLAYER_PROHIBITED');

  const geoAt = Date.parse(claims.geolocationVerifiedAt);
  if (!Number.isFinite(geoAt) || Date.now() - geoAt > 30 * 60 * 1000 || geoAt > Date.now() + 60_000) {
    throw new Error('GEOLOCATION_STALE');
  }
  if (claims.geolocationCountry !== 'BR') throw new Error('GEOLOCATION_OUTSIDE_BR');
  if (!['multisource', 'device'].includes(claims.geolocationAssurance)) throw new Error('GEOLOCATION_UNVERIFIED');

  if (!Number.isInteger(claims.lossLimitCents) || claims.lossLimitCents < 0) throw new Error('LOSS_LIMIT_REQUIRED');
  if (!Number.isInteger(claims.timeLimitMinutes) || claims.timeLimitMinutes <= 0) throw new Error('TIME_LIMIT_REQUIRED');
  if (!claims.responsibleGamingAcceptedAt || !Number.isFinite(Date.parse(claims.responsibleGamingAcceptedAt))) {
    throw new Error('RESPONSIBLE_GAMING_CONSENT_REQUIRED');
  }

  return claims;
}
