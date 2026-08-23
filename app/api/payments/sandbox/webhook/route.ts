import { NextResponse } from 'next/server';
import { updateSandboxLedgerStatus } from '@/lib/payments/sandbox-ledger';
import { updatePaymentStatus } from '@/lib/payments/store';
import type { PaymentStatus } from '@/lib/payments/types';

const allowed: PaymentStatus[] = ['pending', 'paid', 'failed', 'refunded', 'cancelled'];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const paymentId = String(body?.paymentId ?? '');
  const status = body?.status as PaymentStatus;

  if (!paymentId || !allowed.includes(status)) {
    return NextResponse.json({ error: 'Invalid sandbox webhook payload.' }, { status: 400 });
  }

  const payment = updatePaymentStatus(paymentId, status);
  if (!payment) return NextResponse.json({ error: 'Payment not found.' }, { status: 404 });

  updateSandboxLedgerStatus(paymentId, status);
  return NextResponse.json({ sandbox: true, payment });
}
