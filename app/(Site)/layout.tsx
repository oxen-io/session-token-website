import '@/styles/Global.sass';
import '@/styles/Reset.sass';

import { SettingsProvider } from '@/components/Contexts/SettingsContext';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PreviewBanner } from '@/components/preview/PreviewBanner';
import { getSettings, token } from '@/lib/sanity.fetch';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

const PreviewProvider = dynamic(() => import('@/components/preview/PreviewProvider'));

export default async function IndexRoute({ children }: { children: React.ReactNode }) {
  const isDraftMode = draftMode().isEnabled;

  const settings = await getSettings();

  const layout = (
    <div>
      {isDraftMode ? <PreviewBanner /> : null}
      <SettingsProvider value={settings}>
        <Header />
        {children}
        <Footer />
      </SettingsProvider>
    </div>
  );

  if (isDraftMode) {
    return <PreviewProvider token={token}>{layout}</PreviewProvider>;
  }

  return layout;
}
