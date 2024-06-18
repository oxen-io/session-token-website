// NOTE Do not change the import order of stylesheets because of CSS cascading. We use new lines to prevent the imports from being auto sorted.
import '@/styles/globals.css';

import '@/styles/Reset.sass';

import '@/styles/Global.sass';

import { SettingsProvider } from '@/components/Contexts/SettingsContext';
import { Footer } from '@/components/Footer';
import { PreviewBanner } from '@/components/preview/PreviewBanner';
import PreviewProvider from '@/components/preview/PreviewProvider';
import { Environment, isEnv, isProduction } from '@/lib/env';
import { getSettings, token } from '@/lib/sanity.fetch';

import { Container } from '@/components/Container/Container';
import { DevModalServer } from '@/components/DevModalServer';
import { Header } from '@/components/Header/Header';
import { AtypDisplay, AtypText, MonumentExtended } from '@/styles/fonts/fonts';
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
        <Container
          className={`${AtypDisplay.variable} ${AtypText.variable} ${MonumentExtended.variable} font-atyp-text`}
        >
          <Header isDraftMode={isDraftMode} />
          <main className={'-mt-16'}>{children}</main>
          <Footer />
        </Container>
      </SettingsProvider>
    </OptionalPreviewProvider>
  );
}
