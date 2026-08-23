import { createHmac, timingSafeEqual } from 'node:crypto';

function toBuffer(value: string) {
  return Buffer.from(value, 'utf8');
}

export function verifyProviderSignature(rawBody: string, signature: string | null) {
  const secret = process.env.GAME_PROVIDER_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
  const provided = signature.replace(/^sha256=/i, '').trim();

  const expectedBuffer = toBuffer(expected);
  const providedBuffer = toBuffer(provided);
  if (expectedBuffer.length !== providedBuffer.length) return false;

  return timingSafeEqual(expectedBuffer, providedBuffer);
}
