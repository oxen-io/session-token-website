'use client';

import { useContext, useEffect, useState } from 'react';

import Button from '@/components/Button/Button';
import { SettingsContext } from '@/components/Contexts/SettingsContext';
import NavLink from '@/components/NavLink/NavLink';
import Socials from '@/components/Socials/Socials';
import { useScreenWidth } from '@/hooks/screen';
import { Environment, isEnv } from '@/lib/env';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ImageBox from '../ImageBox/ImageBox';
import MenuButton from '../Menu/MenuButton';
import { Spacer } from '../Spacer/Spacer';

export function Header({ isDraftMode }: { isDraftMode: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  const pathname = usePathname();
  const rootPath = pathname?.split('/')[1];

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
      className={clsx(
        'relative z-10 flex w-full items-center justify-between pt-7',
        'lg:mx-auto lg:pt-5',
        'transition duration-300'
      )}
    >
      <div className={clsx('flex w-full items-center justify-between bg-background', 'lg:w-fit')}>
        <Link href="/">
          <ImageBox
            src="/assets/images/logo.png"
            alt="Session Token"
            className={clsx('w-36', 'lg:h-auto lg:w-48')}
          />
          {isDraftMode && (isEnv(Environment.DEV) || isEnv(Environment.QA)) ? (
            <span className="absolute bottom-0 right-0 w-28 rounded-full bg-primary p-0 pl-1.5 text-start text-xs font-bold leading-none text-black opacity-90 lg:w-32">
              DRAFT MODE
            </span>
          ) : null}
        </Link>
        {isSM || isMD ? (
          <div className={clsx('flex flex-row')}>
            <Spacer size="xs" />
            <Button {...menuTopLink} variant={'outline'} size="small" className="max-h-9" />
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
            'flex w-full flex-col items-start justify-between bg-background text-lg text-text',
            'lg:flex-row lg:items-center lg:bg-transparent',
            'transform transition-all duration-300',
            isExpanded
              ? '-mb-20 h-dvh translate-y-0 pb-10 pt-3'
              : 'h-0 -translate-y-full lg:h-auto lg:translate-y-0'
          )}
        >
          <div
            className={clsx(
              'flex w-full flex-col items-start justify-start gap-5 text-lg',
              'md:gap-8 md:text-base',
              'lg:ml-12 lg:flex-row',
              'xl:gap-12 xl:text-lg'
            )}
          >
            {menuItems.map((item, index) => {
              return (
                <div
                  key={`${item.title}-${index}`}
                  onClick={isSM || isMD ? toggleNav : undefined}
                  className={clsx(
                    'cursor-pointer',
                    'hover:text-primary',
                    rootPath === item.slug && 'text-primary'
                  )}
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
              <Socials className="mt-5" />
            </div>
          ) : (
            <Button {...menuTopLink} variant={'outline'} className={'max-h-9'} />
          )}
        </div>
      </div>
    </nav>
  );
}
