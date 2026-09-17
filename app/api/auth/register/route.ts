import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth/password'
import { createSession } from '@/lib/auth/session'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const { name, email, password, accepted } = await request.json()
    const normalizedEmail = String(email ?? '').trim().toLowerCase()
    if (!name || !normalizedEmail || !password || !accepted) {
      return NextResponse.json({ error: 'Preencha todos os campos e confirme a maioridade.' }, { status: 400 })
    }
    if (String(password).length < 6) {
      return NextResponse.json({ error: 'A senha precisa ter pelo menos 6 caracteres.' }, { status: 400 })
    }
    const exists = await prisma.user.findUnique({ where: { email: normalizedEmail } })
    if (exists) return NextResponse.json({ error: 'Este e-mail já está cadastrado.' }, { status: 409 })
    const user = await prisma.user.create({
      data: { email: normalizedEmail, passwordHash: await hashPassword(String(password)) },
    })
    await createSession(user.id)
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Não foi possível criar a conta agora.' }, { status: 500 })
  }
}
