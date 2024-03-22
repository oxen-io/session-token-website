import { Page as PageComponent } from '@/components/Page/Page';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import type { SanitySettings } from '@/lib/sanity.fetch';
import type { Page } from '@/schemas/documents/page';

export default function PageInner({ page, settings }: { page: Page; settings: SanitySettings }) {
  return (
    <PageWrapper>
      <PageComponent page={page} settings={settings} />
    </PageWrapper>
  );
}
