// NOTE don't change the import order of stylesheet imports until we remove SASS entirely because of CSS cascade order
import '@/styles/Global.sass';
import '@/styles/Reset.sass';

import { SettingsProvider } from '@/components/Contexts/SettingsContext';
import { DevModal } from '@/components/DevModal';
import { Footer } from '@/components/Footer';
import { PreviewBanner } from '@/components/preview/PreviewBanner';
import PreviewProvider from '@/components/preview/PreviewProvider';
import { isNotProduction } from '@/lib/env';
import { getSettings, token } from '@/lib/sanity.fetch';

import { Header } from '@/components/Header/Header';
import { draftMode } from 'next/headers';
import type { ReactNode } from 'react';

const OptionalPreviewProvider = ({
  children,
  isDraftMode,
}: {
  children: ReactNode;
  isDraftMode: boolean;
}) => {
  return isDraftMode ? (
    <PreviewProvider token={token}>{children}</PreviewProvider>
  ) : (
    <>{children}</>
  );
};

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const isDraftMode = draftMode().isEnabled;
  const settings = await getSettings();

  return (
    <OptionalPreviewProvider isDraftMode={isDraftMode}>
      {isDraftMode ? <PreviewBanner /> : null}
      {isNotProduction() ? <DevModal /> : null}
      <SettingsProvider value={settings}>
        <Header />
        <main className={'-mt-16'}>{children}</main>
        <Footer />
      </SettingsProvider>
    </OptionalPreviewProvider>
  );
}
