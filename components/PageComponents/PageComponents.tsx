import Modal from '@/components/Modal/Modal';
import type { SettingsSchemaType } from '@/schemas/singletons/settings';
import type { ReactNode } from 'react';

function PageComponents({
  settings,
  children,
}: {
  settings: SettingsSchemaType;
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <Modal settings={settings} />
    </>
  );
}

export default PageComponents;
