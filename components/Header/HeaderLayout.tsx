'use client';

import { useContext, useEffect, useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import Button from '@/components/Button/Button';
import Menu from '@/components/Menu/Menu';
import NavLink from '@/components/NavLink/NavLink';
import Socials from '@/components/Socials/Socials';

import Logo from '@/public/images/logo.png';

import { SettingsContext } from '@/components/Contexts/SettingsContext';
import MenuButton from '@/components/Menu/MenuButton';

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [mobileMenuOpen, setMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const { menuTopLink, mobileMenuCta, menuItems } = useContext(SettingsContext) as any;

  useEffect(() => {
    let lastScrollTop = 0;

    setTimeout(() => {
      setHasMounted(true);
    }, 200);

    window.addEventListener(
      'scroll',
      () => {
        const st = window.scrollY || document.documentElement.scrollTop;
        if (window.scrollY > 0) {
          setHasScrolled(true);
        } else {
          setHasScrolled(false);
        }
        if (st > lastScrollTop && window.scrollY > 100) {
          setHideHeader(true);
        } else if (st < lastScrollTop) {
          setHideHeader(false);
        }
        lastScrollTop = st <= 0 ? 0 : st;
      },
      false
    );
  }, []);

  return (
    <>
      <header
        className={clsx(
          'md:justify-normal md:h-[78px] md:py-0',
          'justify-between h-auto py-[15px]',
          'w-full flex items-center fixed top-0 z-10 transition duration-300 transform px-10 gap-5',
          (hideHeader && !mobileMenuOpen) || !hasMounted ? 'translate-y-[-78px]' : 'translate-y-0',
          hasScrolled && 'backdrop-filter backdrop-blur-sm brightness-60'
        )}
      >
        <NavLink href={'/'}>
          <Image src={Logo} alt="Session Token" priority className="block w-auto h-[29px]" />
        </NavLink>
        <Menu menu={menuItems} className="hidden md:flex" />
        <div className="flex flex-row">
          <Button {...menuTopLink} small />
          <MenuButton open={mobileMenuOpen} setOpen={setMenuOpen} />
        </div>
      </header>
      <div
        className={clsx(
          'fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-9 backdrop-blur-sm transition duration-300 p-2.5 pt-20',
          mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <Menu menu={menuItems} closeMenu={() => setMenuOpen(false)} />
        <div
          className={clsx(
            'absolute bottom-2.5 left-0 w-full p-2.5 flex flex-col items-start transition duration-300 transform',
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          )}
        >
          <Button {...mobileMenuCta} />
          <Socials />
        </div>
      </div>
    </>
  );
}
