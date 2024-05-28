import { Page } from '@/components/Page/Page';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import type { PageSchemaType } from '@/schemas/documents/page';
import type { SettingsSchemaType } from '@/schemas/singletons/settings';

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
