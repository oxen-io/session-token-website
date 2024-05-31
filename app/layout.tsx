// NOTE don't change the import order of stylesheet imports until we remove SASS entirely because of CSS cascade order

import { AtypDisplay, AtypText, MonumentExtended } from '@/styles/fonts/fonts';
import '@/styles/globals.css';

import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${AtypDisplay.variable} ${AtypText.variable} ${MonumentExtended.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
