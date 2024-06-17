// NOTE don't change the import order of stylesheet imports until we remove SASS entirely because of CSS cascade order
import '@/styles/Global.sass';
import '@/styles/Reset.sass';

import { SettingsProvider } from '@/components/Contexts/SettingsContext';
import { Footer } from '@/components/Footer';
import { PreviewBanner } from '@/components/preview/PreviewBanner';
import PreviewProvider from '@/components/preview/PreviewProvider';
import { Environment, isEnv, isProduction } from '@/lib/env';
import { getSettings, token } from '@/lib/sanity.fetch';

import { DevModalServer } from '@/components/DevModalServer';
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
  if (isEnv(Environment.DEV) || isEnv(Environment.QA)) {
    draftMode().enable();
  }

  const isDraftMode = draftMode().isEnabled;
  const settings = await getSettings();

  return (
    <OptionalPreviewProvider isDraftMode={isDraftMode}>
      {isDraftMode && isProduction() ? <PreviewBanner /> : null}
      {isProduction() ? null : <DevModalServer />}
      <SettingsProvider value={settings}>
        <Header isDraftMode={isDraftMode} />
        <main className={'-mt-16'}>{children}</main>
        <Footer />
      </SettingsProvider>
    </OptionalPreviewProvider>
  );
}
