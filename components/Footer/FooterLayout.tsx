import Image from 'next/image';

import Button from '@/components/Button/Button';

import LogoFooter from '@/public/assets/images/logo-footer.png';
import Logo from '@/public/assets/images/logo.png';

import Socials from '@/components/Socials/Socials';
import type { SettingsSchemaType } from '@/schemas/singletons/settings';
import clsx from 'clsx';
import Link from 'next/link';
import NavLink from '../NavLink/NavLink';

const BottomJsx = ({
  lastUpdatedDate,
  className,
}: {
  lastUpdatedDate: string;
  className?: string;
}) => (
  <div
    className={clsx('mx-0 mt-auto flex w-full flex-col items-start text-sm', 'lg:gap-1', className)}
  >
    <div className={clsx('flex flex-col leading-tight', 'lg:flex-row lg:gap-2')}>
      <span>Website last updated</span>
      <span>{lastUpdatedDate}</span>
    </div>
    <div className={clsx('flex flex-col whitespace-nowrap leading-tight', 'lg:flex-row lg:gap-2')}>
      <span>&copy; The Session Network {new Date().getFullYear()}.</span>
      <span>All rights reserved.</span>
    </div>
  </div>
);

export default function Footer({ settings }: { settings: SettingsSchemaType }) {
  const { menuItems, lastUpdatedDate, footerCTA } = settings;

  return (
    <footer className={clsx('my-16 w-full')}>
      <div
        className={clsx(
          'grid w-full grid-cols-2 pt-10',
          'border-x-0 border-b-0 border-t-2 border-solid border-[#676767]',
          'lg:flex lg:flex-row lg:justify-between lg:pt-16'
        )}
      >
        <div className={clsx('xl:w-1/3 xl:max-w-sm')}>
          <div className={clsx('mb-5 flex flex-col', 'lg:mb-0 lg:w-full')}>
            <div>
              <Link href={'/'}>
                <Image
                  src={LogoFooter}
                  alt="Session Token"
                  className={clsx('hidden object-contain', 'lg:block lg:h-auto lg:w-full')}
                  priority
                />
                <Image
                  src={Logo}
                  alt="Session Token"
                  className={clsx('h-10 w-auto object-contain', 'lg:hidden')}
                  priority
                />
              </Link>
            </div>
            <span className={clsx('my-6 text-sm font-medium uppercase', 'lg:mb-24 lg:mt-8')}>
              / Managed by The Session Network
            </span>
            <BottomJsx lastUpdatedDate={lastUpdatedDate} className="lg:hidden" />
          </div>
        </div>
        <div className={clsx('lg:mt-2 lg:flex lg:justify-around lg:gap-8', 'xl:w-1/3')}>
          <div
            className={clsx(
              'ml-12 flex flex-col items-start justify-start gap-5',
              'lg:ml-0 lg:w-full lg:flex-row lg:justify-between'
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
        </div>
        <div className={clsx('flex flex-col gap-8 xl:w-1/4')}>
          {footerCTA ? (
            <Button {...footerCTA} size="large" className="hidden max-h-10 max-w-48 lg:flex" />
          ) : null}
          <Socials className="w-full" />
        </div>
      </div>
      <BottomJsx lastUpdatedDate={lastUpdatedDate} className={'hidden lg:flex'} />
    </footer>
  );
}
