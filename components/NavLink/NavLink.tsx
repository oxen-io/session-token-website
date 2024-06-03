'use client';

import { isLocalLink } from '@/lib/sanity.links';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { pathToRegexp } from 'path-to-regexp';
import React from 'react';

export default function NavLink({
  href,
  as,
  children,
  className: _className = '',
  onClick,
  label,
  prefetch,
  ...props
}: {
  href: string;
  as?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  label?: string;
  prefetch?: boolean;
}) {
  const asPath = usePathname();

  let className = _className;

  if (onClick && !isLocalLink(href)) {
    return (
      <a className={className} onClick={onClick} target="_blank" aria-label={label}>
        {children}
      </a>
    );
  }

  if (href && href.indexOf('http') !== -1) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer" aria-label={label}>
        {children}
      </a>
    );
  }

  if ((href && href.indexOf('tel:') !== -1) || (href && href.indexOf('mailto:') !== -1)) {
    return (
      <a className={className} href={href} aria-label={label}>
        {children}
      </a>
    );
  }

  const isActive = pathToRegexp(as || href.split('?')[0] || '/', [], {
    sensitive: true,
    end: false,
  }).test(asPath);

  const _children = (
    <span className={className} aria-label={label}>
      {children}
    </span>
  );

  const child = React.Children.only(_children);

  const childClassName =
    child.props.className && child.props.className !== className ? child.props.className : '';

  className = clsx(className, childClassName, isActive && 'active');

  return (
    <Link href={href} as={as} {...props} aria-label={label} prefetch={prefetch} onClick={onClick}>
      {React.cloneElement(child, { className })}
    </Link>
  );
}
