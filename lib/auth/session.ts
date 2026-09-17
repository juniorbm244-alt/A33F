import { createHash, randomBytes } from 'node:crypto'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

const COOKIE_NAME = 'a33f_session'
const SESSION_DAYS = 30

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString('hex')
  await prisma.session.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + SESSION_DAYS * 86400000),
    },
  })
  const jar = await cookies()
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DAYS * 86400,
  })
}

export async function getCurrentUser() {
  const token = (await cookies()).get(COOKIE_NAME)?.value
  if (!token) return null
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: true },
  })
  if (!session || session.expiresAt < new Date()) return null
  return session.user
}

export async function destroySession() {
  const jar = await cookies()
  const token = jar.get(COOKIE_NAME)?.value
  if (token) await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } })
  jar.delete(COOKIE_NAME)
}
