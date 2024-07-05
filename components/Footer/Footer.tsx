// NOTE Migrated to @session/ui 2024-07-05
import Button from '@/components/Button/Button';
import Socials from '@/components/Socials/Socials';
import { getSettings } from '@/lib/sanity.fetch';
import clsx from 'clsx';
import Link from 'next/link';
import ImageBox from '../ImageBox/ImageBox';
import NavLink from '../NavLink/NavLink';

const BottomJsx = ({
  lastUpdatedDate,
  footerCopyright,
  className,
}: {
  lastUpdatedDate: string;
  footerCopyright?: string;
  className?: string;
}) => (
  <div
    className={clsx(
      'mx-0 mt-auto flex w-full flex-col items-start text-xs',
      'sm:text-sm',
      'lg:gap-1',
      className
    )}
  >
    <div className={clsx('flex flex-col leading-tight', 'lg:flex-row lg:gap-2')}>
      <span>Website last updated</span>
      <span>{lastUpdatedDate}</span>
    </div>
    <div className={clsx('flex flex-col whitespace-nowrap leading-tight', 'lg:flex-row lg:gap-2')}>
      {footerCopyright ? (
        <span>
          &copy; {footerCopyright} {new Date().getFullYear()}.
        </span>
      ) : null}
      {footerCopyright ? <span>All rights reserved.</span> : null}
    </div>
  </div>
);

export async function Footer() {
  const { menuItems, lastUpdatedDate, footerCTA, footerManagedBy, footerCopyright } =
    await getSettings();

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
                <ImageBox
                  src="/assets/images/logo-footer.png"
                  alt="Session Token"
                  className={clsx(
                    'hidden object-contain',
                    'lg:block lg:h-auto lg:w-96',
                    'xl:w-full'
                  )}
                />
                <ImageBox
                  src="/assets/images/logo.png"
                  alt="Session Token"
                  className={clsx('h-10 w-auto object-contain', 'lg:hidden')}
                />
              </Link>
            </div>
            <span
              className={clsx('my-6 text-sm font-medium uppercase', 'md:mt-16', 'lg:mb-24 lg:mt-8')}
            >
              / {footerManagedBy}
            </span>
            <BottomJsx
              lastUpdatedDate={lastUpdatedDate}
              footerCopyright={footerCopyright}
              className="lg:hidden"
            />
          </div>
        </div>
        <div className={clsx('lg:mt-2 lg:flex lg:justify-around', 'xl:w-1/3')}>
          <div
            className={clsx(
              '-mt-1 ml-12 grid grid-cols-1 gap-5',
              'lg:ml-0 lg:mt-0 lg:w-full lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0'
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
        <div className={clsx('mt-8 flex flex-col gap-8', 'lg:mt-0 lg:w-1/4')}>
          {footerCTA ? (
            <Button {...footerCTA} size="large" className="hidden max-h-10 max-w-48 lg:flex" />
          ) : null}
          <Socials className="w-full" />
        </div>
      </div>
      <BottomJsx
        lastUpdatedDate={lastUpdatedDate}
        footerCopyright={footerCopyright}
        className={'hidden lg:flex'}
      />
    </footer>
  );
}
