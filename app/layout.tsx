import { DevModal } from '@/components/DevModal';
import { isNotProduction } from '@/lib/env';
import { AtypDisplay, AtypText, MonumentExtended } from '@/styles/fonts/fonts';
import '@/styles/globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${AtypDisplay.variable} ${AtypText.variable} ${MonumentExtended.variable}`}
    >
      <body>
        {isNotProduction() ? <DevModal /> : null}
        {children}
      </body>
    </html>
  );
}
