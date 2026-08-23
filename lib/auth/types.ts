export interface UserRecord {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface SessionRecord {
  token: string;
  userId: string;
  expiresAt: string;
}
