import type { Payment, PaymentStatus } from './types';

const store = new Map<string, Payment>();

export function savePayment(payment: Payment) {
  store.set(payment.id, payment);
  return payment;
}

export function updatePaymentStatus(id: string, status: PaymentStatus) {
  const payment = store.get(id);
  if (!payment) return null;
  const updated = { ...payment, status };
  store.set(id, updated);
  return updated;
}

export function listPayments(customerId?: string) {
  return [...store.values()].filter((payment) => !customerId || payment.customerId === customerId);
}
