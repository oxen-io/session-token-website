'use client';

import useStore from '@/lib/store';
import x from '@/public/images/x';
import clsx from 'clsx';

import type { SettingsSchemaType } from '@/schemas/singletons/settings';
import styles from './Modal.module.sass';
import Share from './ModalTypes/Share';

export default function Modal({ settings }: { settings: SettingsSchemaType }) {
  const { closeModal, modalData } = useStore() as {
    closeModal: () => void;
    modalData: {
      type: string;
      subType: string;
      data: any;
      isVisible: boolean;
    };
  };

  if (!modalData) {
    return null;
  }

  const { type, isVisible } = modalData;

  return (
    <div
      className={clsx(styles.modal, isVisible && styles.visible)}
      onClick={closeModal}
      onKeyDown={closeModal}
      role="button"
      tabIndex={0}
      aria-label="clos emodal"
    >
      <div
        className={styles[type]}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="button"
        tabIndex={0}
        data-lenis-prevent
        aria-label="modal"
      >
        {type ? <button onClick={closeModal}>{x}</button> : null}
        <Share settings={settings} />
      </div>
    </div>
  );
}
