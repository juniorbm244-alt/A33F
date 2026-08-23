import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'A33F — Sua experiência, seu ritmo',
  description: 'A33F — experiência digital moderna e mobile-first.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
