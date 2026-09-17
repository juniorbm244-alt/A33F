import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/lib/auth/password'
import { createSession } from '@/lib/auth/session'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const normalizedEmail = String(email ?? '').trim().toLowerCase()
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } })
    if (!user || !(await verifyPassword(String(password ?? ''), user.passwordHash))) {
      return NextResponse.json({ error: 'E-mail ou senha inválidos.' }, { status: 401 })
    }
    await createSession(user.id)
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } })
  } catch {
    return NextResponse.json({ error: 'Não foi possível entrar agora.' }, { status: 500 })
  }
}
