import FlexibleContent from '@/components/FlexibleContent/FlexibleContent';

import PageComponents from '@/components/PageComponents/PageComponents';
import type { SettingsSchemaType } from '@/schemas/singletons/settings';

export function Page({ page, settings }: { page: any; settings: SettingsSchemaType }) {
  // Default to an empty object to allow previews on non-existent documents
  const { modules } = page ?? {};

  return (
    <PageComponents settings={settings}>
      <FlexibleContent rows={modules} settings={settings} />
    </PageComponents>
  );
}

export default Page;
