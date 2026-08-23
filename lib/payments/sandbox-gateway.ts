import type { PaymentGateway, PaymentRequest, PaymentResponse } from './types';

/** Local-only sandbox adapter. It never contacts a real payment provider. */
export class SandboxPaymentGateway implements PaymentGateway {
  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    return {
      id: `sandbox_${request.idempotencyKey}`,
      status: 'pending',
      amountCents: request.amountCents,
      sandbox: true,
    };
  }

  async getPayment(id: string): Promise<PaymentResponse> {
    return {
      id,
      status: 'pending',
      amountCents: 0,
      sandbox: true,
    };
  }
}

export const paymentGateway = new SandboxPaymentGateway();
