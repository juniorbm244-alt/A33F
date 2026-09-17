import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { listSandboxLedger } from '@/lib/payments/sandbox-ledger';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });

  const entries = listSandboxLedger(user.id);
  const balanceCents = entries.reduce((total, entry) => {
    if (entry.status !== 'paid') return total;
    return entry.type === 'debit' ? total - entry.amountCents : total + entry.amountCents;
  }, 0);

  return NextResponse.json({ sandbox: true, currency: 'BRL', balanceCents, entries });
}
