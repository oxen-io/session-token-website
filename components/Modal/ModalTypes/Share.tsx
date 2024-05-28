'use client';

import { getShareSites, getSocialIcon } from '@/lib/utils';

import Button from '@/components/Button/Button';

import type { SettingsSchemaType } from '@/schemas/singletons/settings';
import { useState } from 'react';
import s from './Share.module.sass';

export default function Share({ settings }: { settings: SettingsSchemaType }) {
  const { shareModal } = settings ?? {};

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
    <div className={s.Share}>
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
        <div className={s.CopyBox} onClick={handleCopyUrl}>
          {currentUrl && <input type="text" value={currentUrl} />}
          <Button title={!copied ? 'Copy URL' : 'Copied!'} />
        </div>
      </div>
    </div>
  );
}
