import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { paymentGateway } from '@/lib/payments/sandbox-gateway';
import { recordSandboxPayment } from '@/lib/payments/sandbox-ledger';
import { savePayment } from '@/lib/payments/store';

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body || !Number.isInteger(body.amountCents) || body.amountCents <= 0 || body.amountCents > 1000000) {
    return NextResponse.json({ error: 'Valor de teste inválido.' }, { status: 400 });
  }

  const payment = await paymentGateway.createPayment({
    amountCents: body.amountCents,
    currency: 'BRL',
    customerId: user.id,
    description: String(body.description ?? 'A33F sandbox transaction'),
    idempotencyKey: String(body.idempotencyKey ?? crypto.randomUUID()),
  });

  savePayment(payment);
  recordSandboxPayment(payment);
  return NextResponse.json({ sandbox: true, payment }, { status: 201 });
}
