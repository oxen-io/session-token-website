import FlexibleContent from '@/components/FlexibleContent/FlexibleContent';

import PageComponents from '@/components/PageComponents/PageComponents';

export function Page({ data, settings }: { data: any; settings: any }) {
  // Default to an empty object to allow previews on non-existent documents
  const { modules } = data ?? {};

  return (
    <PageComponents settings={settings}>
      <FlexibleContent rows={modules} settings={settings} />
    </PageComponents>
  );
}

export default Page;
