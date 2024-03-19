'use client';

import NavLink from '@/components/NavLink/NavLink';
import clsx from 'clsx';

import { getLinkUrl } from '@/lib/sanity.links';

import buttonLogos from '@/public/images/buttonLogos';
import s from './Button.module.sass';

export default function Button({
  link,
  url,
  title,
  handleClick,
  className,
  prefetch,
  type,
  small,
  iconName,
  hasArrow,
  disabled,
  isPrimary,
}: {
  link?: any;
  url?: string;
  title?: string;
  handleClick?: () => void;
  className?: string;
  prefetch?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
  small?: boolean;
  iconName?: string;
  hasArrow?: boolean;
  disabled?: boolean;
  isPrimary?: boolean;
}) {
  const handleDummyClick = undefined;

  const _handleClick = handleClick || handleDummyClick;

  const buttonClass = clsx(
    s.Button,
    'button',
    className && className,
    small && s.Small,
    !isPrimary && s.Inverted,
    disabled && s.Disabled
  );

  const buttonIcon = iconName ? buttonLogos[iconName] : null;

  const buttonInner = (innterTitle: string | undefined) => {
    return (
      <>
        {buttonIcon}
        {innterTitle && (
          <span dangerouslySetInnerHTML={{ __html: `${innterTitle}${hasArrow ? ' ↗' : ''}` }} />
        )}
      </>
    );
  };

  if (!url && !link) {
    return (
      <button className={buttonClass} onClick={_handleClick} type={type}>
        {buttonInner(title)}
      </button>
    );
  }

  let linkUrl = url;
  let _title = title;

  if (link) {
    linkUrl = getLinkUrl(link);
    _title = link.title || title;
  }

  return (
    <NavLink
      className={buttonClass}
      href={linkUrl ?? ''}
      prefetch={prefetch}
      onClick={_handleClick}
    >
      {buttonInner(_title)}
    </NavLink>
  );
}
