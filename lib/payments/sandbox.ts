import type { CreatePaymentInput, Payment, PaymentGateway } from './types';

const payments = new Map<string, Payment>();

export class SandboxPaymentGateway implements PaymentGateway {
  async createPayment(input: CreatePaymentInput): Promise<Payment> {
    const existing = [...payments.values()].find((payment) => payment.description === input.description && payment.customerId === input.customerId);
    if (existing) return existing;

    const payment: Payment = {
      id: `sandbox_${crypto.randomUUID()}`,
      status: 'pending',
      amountCents: input.amountCents,
      currency: input.currency ?? 'BRL',
      customerId: input.customerId,
      description: input.description,
      createdAt: new Date().toISOString(),
      sandbox: true,
    };

    payments.set(payment.id, payment);
    return payment;
  }

  async getPayment(id: string) {
    return payments.get(id) ?? null;
  }
}
