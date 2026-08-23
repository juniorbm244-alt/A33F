import type { Metadata } from 'next';
import './globals.css';
import './casino.css';
import './auth-casino.css';

export const metadata: Metadata = {
  title: 'A33F — Cassino & Entretenimento',
  description: 'A33F — plataforma mobile-first de cassino e entretenimento em desenvolvimento.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
