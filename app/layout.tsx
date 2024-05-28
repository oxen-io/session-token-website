import { AtypDisplay, AtypText, MonumentExtended } from '@/styles/fonts/fonts';
import '@/styles/globals.css';

import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${AtypDisplay.variable} ${AtypText.variable} ${MonumentExtended.variable}`}
    >
      <body className={'text-text'}>{children}</body>
    </html>
  );
}
