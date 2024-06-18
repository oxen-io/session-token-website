import FlexibleContent from '@/components/FlexibleContent/FlexibleContent';

import PageComponents from '@/components/PageComponents/PageComponents';
import type { PageSchemaType } from '@/schemas/documents/page';
import type { SettingsSchemaType } from '@/schemas/singletons/settings';

export default function CMSPage({
  page,
  settings,
}: {
  page: PageSchemaType;
  settings: SettingsSchemaType;
}) {
  // Default to an empty object to allow previews on non-existent documents
  const { modules } = page ?? {};

  return (
    <PageComponents>
      <FlexibleContent rows={modules} settings={settings} />
    </PageComponents>
  );
}
