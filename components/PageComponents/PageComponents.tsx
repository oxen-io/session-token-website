import Modal from '@/components/Modal/Modal';

function PageComponents({ settings, children }: { settings: any; children: React.ReactNode }) {
  return (
    <>
      {children}
      <Modal settings={settings} />
    </>
  );
}

export default PageComponents;
