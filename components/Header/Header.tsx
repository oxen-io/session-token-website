'use client';

import { useContext, useEffect, useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import Button from '@/components/Button/Button';
import { SettingsContext } from '@/components/Contexts/SettingsContext';
import NavLink from '@/components/NavLink/NavLink';
import Socials from '@/components/Socials/Socials';
import { useScreenWidth } from '@/hooks/screen';
import Logo from '@/public/images/logo.png';
import Link from 'next/link';
import MenuButton from '../Menu/MenuButton';
import { Spacer } from '../Spacer/Spacer';

export function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  const { isSM, isMD } = useScreenWidth();

  const { menuTopLink, mobileMenuCta, menuItems } = useContext(SettingsContext);

  useEffect(() => {
    if (isSM || isMD) {
      if (isExpanded) {
        document.body.style.height = '100%';
        document.body.style.overflowY = 'hidden';
      }
      if (!isExpanded && document.body.style) {
        document.body.removeAttribute('style');
      }
    }
  }, [isExpanded, isMD, isSM]);

  return (
    <nav
      role="navigation"
      // Try to match the global Container class
      className={clsx(
        'relative z-10 flex w-full max-w-[1580px] items-center justify-between pt-7',
        'lg:mx-auto lg:px-10 lg:pt-5',
        'transition duration-300'
      )}
    >
      <div className={clsx('flex w-full items-center justify-between px-5', 'lg:w-fit lg:px-0')}>
        <Link href="/">
          <Image
            src={Logo}
            alt="Session Token"
            className={clsx('w-36', 'lg:h-auto lg:w-48')}
            priority
          />
        </Link>
        {isSM || isMD ? (
          <div className={clsx('flex flex-row')}>
            <Spacer size="xs" />
            <Button {...menuTopLink} size="small" className="max-h-9" />
            <Spacer size="xs" />
            <MenuButton open={isExpanded} setOpen={toggleNav} />
          </div>
        ) : null}
      </div>
      <div
        className={clsx(
          'absolute left-0 right-0 top-20 z-0 w-full overflow-hidden',
          'lg:relative lg:top-0 lg:overflow-visible'
        )}
      >
        <div
          className={clsx(
            'flex w-full flex-col items-start justify-between bg-background px-5 text-lg text-white',
            'lg:flex-row lg:items-center lg:bg-transparent lg:px-0',
            'transform transition-all duration-300',
            isExpanded
              ? '-mb-20 h-dvh translate-y-0 pb-10 pt-3'
              : 'h-0 -translate-y-full lg:h-auto lg:translate-y-0'
          )}
        >
          <div
            className={clsx(
              'flex w-full flex-col items-start justify-start gap-5',
              'lg:ml-12 lg:flex-row lg:gap-12'
            )}
          >
            {menuItems.map((item, index) => {
              return (
                <div
                  key={`${item.title}-${index}`}
                  onClick={isSM || isMD ? toggleNav : undefined}
                  className={clsx('cursor-pointer', 'hover:text-primary')}
                >
                  {item.slug || item.href ? (
                    <NavLink
                      key={`${item.title}-${index}`}
                      href={item.slug ? `/${item.slug}` : item.href ?? '/'}
                    >
                      {item.title}
                    </NavLink>
                  ) : (
                    item.title
                  )}
                </div>
              );
            })}
          </div>

          {isSM || isMD ? (
            <div className={clsx('flex flex-col pb-16')}>
              <Button {...mobileMenuCta} />
              <Socials />
            </div>
          ) : (
            <Button {...menuTopLink} className={'max-h-9'} />
          )}
        </div>
      </div>
    </nav>
  );
}
