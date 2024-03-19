import { Page } from '@/components/Page/Page';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import type { SanityDocument, SanitySettings } from '@/lib/sanity.fetch';

export default function PageInner({
  data,
  settings,
}: {
  data: SanityDocument;
  settings: SanitySettings;
}) {
  return (
    <PageWrapper>
      <Page data={data} settings={settings} />
    </PageWrapper>
  );
}
