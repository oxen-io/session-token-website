import { getSettings } from '@/lib/sanity.fetch';

import FooterLayout from './FooterLayout';

export async function Footer() {
  const settings = await getSettings();

  return <FooterLayout settings={settings} />;
}
