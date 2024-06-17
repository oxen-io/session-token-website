'use client';

import { SettingsContext } from '@/components/Contexts/SettingsContext';
import { getSocialIcon } from '@/lib/utils';
import { useContext } from 'react';

import type { SocialLinksSchemaType } from '@/schemas/partials/socialLinks';
import clsx from 'clsx';
import s from './Socials.module.sass';

export default function Socials({
  socialLinks: parentSocialLinks,
  className,
}: {
  socialLinks?: Array<SocialLinksSchemaType>;
  className?: string;
}) {
  const { socialLinks: settingsSocialLinks } = useContext(SettingsContext);

  const socialLinks = parentSocialLinks || settingsSocialLinks;

  return (
    <ul className={clsx(s.Outer, className)}>
      {socialLinks?.map((item, index) => {
        const { link, company } = item;

        return (
          <li key={index}>
            <a href={link}>{getSocialIcon(company)}</a>
          </li>
        );
      })}
    </ul>
  );
}
