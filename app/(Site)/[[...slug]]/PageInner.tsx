import { Page } from '@/components/Page/Page';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import type { SettingsSchemaType } from '@/lib/sanity.fetch';
import type { PageSchemaType } from '@/schemas/documents/page';

export default function PageInner({
  page,
  settings,
}: {
  page: PageSchemaType;
  settings: SettingsSchemaType;
}) {
  return (
    <PageWrapper>
      <Page page={page} settings={settings} />
    </PageWrapper>
  );
}
