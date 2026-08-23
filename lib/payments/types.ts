export type PaymentStatus = 'created' | 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled';

export interface CreatePaymentInput {
  amountCents: number;
  currency?: 'BRL';
  customerId: string;
  description: string;
  idempotencyKey?: string;
}

export interface PaymentRequest extends CreatePaymentInput {
  currency: 'BRL';
  idempotencyKey: string;
}

export interface Payment {
  id: string;
  status: PaymentStatus;
  amountCents: number;
  currency: 'BRL';
  customerId: string;
  description: string;
  idempotencyKey?: string;
  createdAt: string;
  sandbox: true;
  checkoutUrl?: string;
}

export type PaymentResponse = Payment;

export interface PaymentGateway {
  createPayment(request: CreatePaymentInput): Promise<Payment>;
  getPayment(id: string): Promise<Payment | null>;
}
