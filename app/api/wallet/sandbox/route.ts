import { NextResponse } from 'next/server';
import { listSandboxLedger } from '@/lib/payments/sandbox-ledger';

export async function GET(request: Request) {
  const customerId = new URL(request.url).searchParams.get('customerId') ?? undefined;
  const entries = listSandboxLedger(customerId);
  const balanceCents = entries.reduce((total, entry) => {
    if (entry.status !== 'paid') return total;
    return entry.type === 'debit' ? total - entry.amountCents : total + entry.amountCents;
  }, 0);

  return NextResponse.json({ sandbox: true, currency: 'BRL', balanceCents, entries });
}
