import { NextResponse } from 'next/server';
import { paymentGateway } from '@/lib/payments/sandbox-gateway';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || !Number.isInteger(body.amountCents) || body.amountCents <= 0 || body.amountCents > 1000000) {
    return NextResponse.json({ error: 'Invalid sandbox amount.' }, { status: 400 });
  }

  const payment = await paymentGateway.createPayment({
    amountCents: body.amountCents,
    currency: 'BRL',
    customerId: String(body.customerId ?? 'sandbox-user'),
    description: String(body.description ?? 'A33F sandbox transaction'),
    idempotencyKey: String(body.idempotencyKey ?? crypto.randomUUID()),
  });

  return NextResponse.json(payment, { status: 201 });
}
