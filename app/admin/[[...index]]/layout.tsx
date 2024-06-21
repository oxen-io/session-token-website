import '@/styles/sanity.css';
import type { ReactNode } from 'react';

export default async function SanityLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
