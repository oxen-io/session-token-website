'use client';

import { SettingsContext } from '@/components/Contexts/SettingsContext';
import { getSocialIcon } from '@/lib/utils';
import { useContext } from 'react';

import type { SocialLinksSchemaType } from '@/schemas/partials/socialLinks';
import s from './Socials.module.sass';

export default function Socials({
  socialLinks: parentSocialLinks,
}: {
  socialLinks?: Array<SocialLinksSchemaType>;
}) {
  const { socialLinks: settingsSocialLinks } = useContext(SettingsContext);

  const socialLinks = parentSocialLinks || settingsSocialLinks;

  return (
    <ul className={s.Outer}>
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
