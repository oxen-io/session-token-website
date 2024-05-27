import { SettingsProvider } from '@/components/Contexts/SettingsContext';
import { DevModal } from '@/components/DevModal';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PreviewBanner } from '@/components/preview/PreviewBanner';
import { isNotProduction } from '@/lib/env';
import { getSettings, token } from '@/lib/sanity.fetch';
import '@/styles/Global.sass';
import '@/styles/Reset.sass';
import { AtypDisplay } from '@/styles/fonts/fonts';
import '@/styles/globals.css';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { Fragment } from 'react';

const PreviewProvider = dynamic(() => import('@/components/preview/PreviewProvider'));

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isDraftMode = draftMode().isEnabled;
  const OptionalPreviewProvider = isDraftMode ? PreviewProvider : Fragment;
  const settings = await getSettings();

  return (
    <html lang="en" className={`${AtypDisplay.className}`}>
      <body className="text-text">
        <OptionalPreviewProvider token={token}>
          {isDraftMode ? <PreviewBanner /> : null}
          <SettingsProvider value={settings}>
            <Header />
            <main>{children}</main>
            <Footer />
          </SettingsProvider>
        </OptionalPreviewProvider>
        {isNotProduction() ? <DevModal /> : null}
      </body>
    </html>
  );
}
