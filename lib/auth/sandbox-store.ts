import type { SessionRecord, UserRecord } from './types';

// Development-only store. Replace with a persistent database before production.
const users = new Map<string, UserRecord>();
const sessions = new Map<string, SessionRecord>();

export function createSandboxUser(email: string, name: string): UserRecord {
  const user: UserRecord = { id: `user_${crypto.randomUUID()}`, email, name, createdAt: new Date().toISOString() };
  users.set(user.id, user);
  return user;
}

export function createSandboxSession(userId: string): SessionRecord {
  const session: SessionRecord = { token: crypto.randomUUID(), userId, expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString() };
  sessions.set(session.token, session);
  return session;
}

export function getSandboxSession(token: string) {
  const session = sessions.get(token);
  if (!session || Date.parse(session.expiresAt) <= Date.now()) return null;
  return session;
}

export function getSandboxUser(userId: string) {
  return users.get(userId) ?? null;
}
