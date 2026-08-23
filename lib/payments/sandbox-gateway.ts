import type { CreatePaymentInput, Payment, PaymentGateway } from './types';

/** Local-only sandbox adapter. It never contacts a real payment provider. */
export class SandboxPaymentGateway implements PaymentGateway {
  async createPayment(request: CreatePaymentInput): Promise<Payment> {
    return {
      id: `sandbox_${request.idempotencyKey ?? crypto.randomUUID()}`,
      status: 'pending',
      amountCents: request.amountCents,
      currency: request.currency ?? 'BRL',
      customerId: request.customerId,
      description: request.description,
      idempotencyKey: request.idempotencyKey,
      createdAt: new Date().toISOString(),
      sandbox: true,
    };
  }

  async getPayment(_id: string): Promise<Payment | null> {
    return null;
  }
}

export const paymentGateway = new SandboxPaymentGateway();
