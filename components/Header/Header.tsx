'use client';

import { useContext, useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import Button from '@/components/Button/Button';
import { SettingsContext } from '@/components/Contexts/SettingsContext';
import NavLink from '@/components/NavLink/NavLink';
import Socials from '@/components/Socials/Socials';
import Logo from '@/public/images/logo.png';
import MenuButton from '../Menu/MenuButton';

export function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  const { menuTopLink, mobileMenuCta, menuItems } = useContext(SettingsContext);

  return (
    <nav
      role="navigation"
      className={clsx(
        'container relative flex items-center justify-between mx-auto z-10 w-full',
        'md:justify-normal',
        'transition duration-300'
      )}
    >
      <div
        className={clsx('flex items-center justify-between w-full px-5 pt-7', 'lg:w-1/3 lg:p-0')}
      >
        <NavLink href="/">
          <Image
            src={Logo}
            alt="Session Token"
            className={clsx('w-36', 'md:w-auto md:h-[29px]')}
            priority
          />
        </NavLink>
        <div className={clsx('flex flex-row')}>
          <Button {...menuTopLink} small />
          <MenuButton open={isExpanded} setOpen={toggleNav} />
        </div>
      </div>
      <div
        className={clsx(
          'absolute top-20 left-0 right-0 w-screen overflow-hidden z-0',
          'lg:relative lg:overflow-visible lg:w-2/3 lg:top-0',
          'transform transition-all duration-300'
        )}
      >
        <div
          className={clsx(
            'bg-background flex flex-col items-start justify-between text-lg text-white w-full px-5',
            'lg:text-base lg:flex-row lg:items-center lg:justify-end lg:font-bold lg:text-gray',
            'transform transition-all duration-300',
            isExpanded
              ? 'h-screen translate-y-0 -mb-20 pt-3 pb-10'
              : 'h-0 -translate-y-full lg:translate-y-0'
          )}
        >
          <div
            className={clsx('flex flex-col justify-start items-start w-full max-w-[1000px] gap-5')}
          >
            {menuItems.map((item, index) => {
              return (
                <div
                  key={`${item.title}-${index}`}
                  className={clsx('cursor-pointer', 'hover:text-primary')}
                >
                  <NavLink
                    key={`${item.title}-${index}`}
                    href={item.slug ? `/${item.slug}` : item.href ?? '/'}
                  >
                    {item.title}
                  </NavLink>
                </div>
              );
            })}
          </div>
          <div className={clsx('flex flex-col pb-16')}>
            <Button {...mobileMenuCta} />
            <Socials />
          </div>
        </div>
      </div>
    </nav>
  );
}
