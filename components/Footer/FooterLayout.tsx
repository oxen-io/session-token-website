import Image from 'next/image';

import LogoFooter from '@/public/images/logo-footer.png';
import Logo from '@/public/images/logo.png';

import Socials from '@/components/Socials/Socials';
import type { SettingsSchemaType } from '@/schemas/singletons/settings';
import clsx from 'clsx';
import Link from 'next/link';
import NavLink from '../NavLink/NavLink';
import s from './Footer.module.sass';

const BottomJsx = ({
  lastUpdatedDate,
  className,
}: {
  lastUpdatedDate: string;
  className?: string;
}) => (
  <div
    className={clsx(
      s.Bottom,
      'mx-0 mt-auto flex w-full flex-col items-start text-sm',
      'lg:gap-1',
      className
    )}
  >
    <div className={clsx('flex flex-col leading-tight', 'lg-gap-2')}>
      <span>Website last updated</span>
      <span>{lastUpdatedDate}</span>
    </div>
    <div className={clsx('flex flex-col whitespace-nowrap leading-tight', 'lg-gap-2')}>
      <span>&copy; The Session Network {new Date().getFullYear()}.</span>
      <span>All rights reserved.</span>
    </div>
  </div>
);

export default function Footer({ settings }: { settings: SettingsSchemaType }) {
  const { menuItems, lastUpdatedDate } = settings;

  return (
    <footer className="mb-5 mt-[50px] w-full">
      <div className="m-auto">
        <div
          className={clsx(
            'grid grid-cols-2 pt-10',
            'border-x-0 border-b-0 border-t-2 border-solid border-[#676767]',
            'lg:flex lg:items-start lg:justify-between'
          )}
        >
          <div className={s.Main}>
            <div className={s.Logo}>
              <Link href={'/'}>
                <Image src={LogoFooter} alt="Session Token" />
                <Image src={Logo} alt="Session Token" />
              </Link>
            </div>
            <span className={clsx('my-6 text-sm font-medium uppercase')}>
              / Managed by The Session Network
            </span>
            <BottomJsx lastUpdatedDate={lastUpdatedDate} className="lg:hidden" />
          </div>
          {/* {menuItems.length > 1 ? <Menu menu={menuItems} footer /> : null} */}
          <div
            className={clsx(
              'ml-12 flex w-full flex-col items-start justify-start gap-5',
              'lg:flex-row lg:gap-12'
            )}
          >
            {menuItems.map((item, index) => {
              return (
                <div
                  key={`${item.title}-${index}`}
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
          <Socials />
        </div>
        <BottomJsx lastUpdatedDate={lastUpdatedDate} className={'hidden lg:flex'} />
      </div>
    </footer>
  );
}
