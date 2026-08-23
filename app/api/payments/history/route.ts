import { NextResponse } from 'next/server';
import { listPayments } from '@/lib/payments/store';

export async function GET(request: Request) {
  const customerId = new URL(request.url).searchParams.get('customerId') ?? undefined;
  return NextResponse.json({ sandbox: true, payments: listPayments(customerId) });
}
