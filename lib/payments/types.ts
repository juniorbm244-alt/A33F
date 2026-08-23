export type PaymentStatus = 'created' | 'pending' | 'paid' | 'failed' | 'refunded';

export interface PaymentRequest {
  amountCents: number;
  currency: 'BRL';
  customerId: string;
  description: string;
  idempotencyKey: string;
}

export interface PaymentResponse {
  id: string;
  status: PaymentStatus;
  amountCents: number;
  sandbox: boolean;
  checkoutUrl?: string;
}

export interface PaymentGateway {
  createPayment(request: PaymentRequest): Promise<PaymentResponse>;
  getPayment(id: string): Promise<PaymentResponse>;
}
