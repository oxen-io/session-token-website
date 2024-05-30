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
        'relative flex items-center justify-between z-10 w-full max-w-[1580px] pt-7',
        'lg:pt-5 lg:px-10 lg:mx-auto',
        'transition duration-300'
      )}
    >
      <div className={clsx('flex justify-between items-center w-full px-5', 'lg:w-fit lg:px-0')}>
        <Link href="/">
          <Image
            src={Logo}
            alt="Session Token"
            className={clsx('w-36', 'lg:w-48 lg:h-auto')}
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
          'absolute top-20 left-0 right-0 w-full overflow-hidden z-0',
          'lg:relative lg:overflow-visible lg:top-0'
        )}
      >
        <div
          className={clsx(
            'bg-background flex flex-col items-start justify-between text-lg text-white w-full px-5',
            'lg:bg-transparent lg:flex-row lg:items-center lg:px-0',
            'transform transition-all duration-300',
            isExpanded
              ? 'h-screen translate-y-0 -mb-20 pt-3 pb-10'
              : 'h-0 -translate-y-full lg:h-auto lg:translate-y-0'
          )}
        >
          <div
            className={clsx(
              'flex flex-col justify-start items-start w-full gap-5',
              'lg:flex-row lg:gap-12 lg:ml-12'
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
