import type { Payment, PaymentStatus } from './types';

export interface LedgerEntry {
  id: string;
  paymentId: string;
  customerId: string;
  type: 'credit' | 'debit' | 'reversal';
  amountCents: number;
  status: PaymentStatus;
  createdAt: string;
  sandbox: true;
}

const ledger: LedgerEntry[] = [];

export function recordSandboxPayment(payment: Payment): LedgerEntry {
  const entry: LedgerEntry = {
    id: `ledger_${crypto.randomUUID()}`,
    paymentId: payment.id,
    customerId: payment.customerId,
    type: 'credit',
    amountCents: payment.amountCents,
    status: payment.status,
    createdAt: new Date().toISOString(),
    sandbox: true,
  };
  ledger.push(entry);
  return entry;
}

export function listSandboxLedger(customerId?: string) {
  return customerId ? ledger.filter((entry) => entry.customerId === customerId) : [...ledger];
}

export function updateSandboxLedgerStatus(paymentId: string, status: PaymentStatus) {
  for (const entry of ledger) {
    if (entry.paymentId === paymentId) entry.status = status;
  }
}
