import Image from 'next/image';

import Button from '@/components/Button/Button';
import Menu from '@/components/Menu/Menu';
import NavLink from '@/components/NavLink/NavLink';

import LogoFooter from '@/public/images/logo-footer.png';
import Logo from '@/public/images/logo.png';

import Socials from '@/components/Socials/Socials';
import type { SettingsSchemaType } from '@/schemas/singletons/settings';
import s from './Footer.module.sass';

export default function Footer({ settings }: { settings: SettingsSchemaType }) {
  const { menuItems, lastUpdatedDate, menuTopLink } = settings;

  const d = new Date();
  const year = d.getFullYear();

  const bottomJsx = (
    <div className={s.Bottom}>
      Website last updated {lastUpdatedDate}
      <br />
      &copy; Session {year}. All rights reserved.
    </div>
  );

  return (
    <footer className="w-full mt-[50px] mb-5">
      <div className="m-auto max-w-[1580px] px-[40px]">
        <div className={s.FooterCont}>
          <div className={s.Main}>
            <div className={s.Logo}>
              <NavLink href={'/'} label="home">
                <Image src={LogoFooter} alt="Session Token" />
                <Image src={Logo} alt="Session Token" />
              </NavLink>
            </div>
            <span className="smallTitle">/ Managed by Session</span>
            {bottomJsx}
          </div>
          {menuItems.length > 1 ? <Menu menu={menuItems} footer /> : null}
          <div className={s.Links}>
            <Button {...menuTopLink} />
            <Socials />
          </div>
        </div>
        {bottomJsx}
      </div>
    </footer>
  );
}
