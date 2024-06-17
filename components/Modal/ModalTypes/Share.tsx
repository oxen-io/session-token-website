'use client';

import { getShareSites, getSocialIcon } from '@/lib/utils';

import Button from '@/components/Button/Button';

import type { SettingsSchemaType, ShareModalSchemaType } from '@/schemas/singletons/settings';
import clsx from 'clsx';
import { useState } from 'react';
import s from './Share.module.sass';

export default function Share({ settings }: { settings: SettingsSchemaType }) {
  const { shareModal: _shareModal } = settings ?? {};
  const shareModal = _shareModal as ShareModalSchemaType;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareSites = getShareSites(currentUrl);

  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    if (!currentUrl || !navigator) {
      return;
    }
    void navigator.clipboard.writeText(`${currentUrl}`);
    setCopied(true);
  };

  return (
    <div className={clsx(s.Share, 'px-5 py-8', 'lg:px-8 lg:py-12')}>
      <h3
        dangerouslySetInnerHTML={{
          __html: shareModal?.title || 'Share',
        }}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: shareModal?.copy || 'Share this article with your friends',
        }}
      />
      <ul className={s.Buttons}>
        {shareSites?.map((site, index) => {
          const { company, href } = site;
          return (
            <li key={index}>
              <a href={href}>{getSocialIcon(company)}</a>
            </li>
          );
        })}
      </ul>
      <div className={s.CopyCont}>
        <p>Or copy the link below</p>
        <div className={clsx(s.CopyBox, 'flx flex-col items-center gap-4')} onClick={handleCopyUrl}>
          {currentUrl && <input type="text" value={currentUrl} />}
          <Button
            className={clsx('relative right-0 top-0', 'lg:absolute lg:right-3 lg:top-2')}
            title={!copied ? 'Copy URL' : 'Copied!'}
          />
        </div>
      </div>
    </div>
  );
}
