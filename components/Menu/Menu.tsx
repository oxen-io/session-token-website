'use client';

import clsx from 'clsx';

import NavLink from '@/components/NavLink/NavLink';

export default function Menu({
  menu,
  footer,
  closeMenu,
  className,
}: {
  menu: Array<{
    title: string;
    // TODO: Fix this when overhauling the menu
    slug?: string;
    href?: string;
    children: Array<{
      title: string;
      slug: string;
    }>;
  }>;
  footer?: boolean;
  closeMenu?: () => void;
  className?: string;
}) {
  if (!menu) {
    return null;
  }

  return (
    <ul
      className={clsx(
        'mr-auto flex gap-[15px]',
        footer && 'ml-[8%] flex w-full flex-wrap items-start gap-0 pb-[100px]',
        'md:flex-nowrap',
        className
      )}
    >
      {menu?.map(({ title, slug, href, children }, index) => {
        return (
          <li
            key={index}
            style={{
              transitionDelay: `${index * 0.1}s`,
            }}
            onClick={() => {
              if (closeMenu) {
                closeMenu();
              }
            }}
            className={clsx(
              'flex',
              footer ? 'w-1/3 flex-col items-start justify-start text-start' : 'items-center'
            )}
          >
            <div
              className={clsx(
                'text-decoration-none cursor-pointer px-5 py-[10px] text-white hover:text-primary',
                footer && 'block px-[5px] duration-200'
              )}
            >
              {slug || href ? (
                <NavLink href={slug ? `/${slug}` : href ?? '/'}>{title}</NavLink>
              ) : (
                title
              )}
            </div>
            {children && (
              <ul
                className={clsx(
                  'w-min-[300px] absolute left-0 top-[40px] m-0 hidden w-full bg-red-500 p-[20px] opacity-0 duration-200 hover:visible hover:opacity-100',
                  footer && 'visible absolute top-[31px] min-w-0 bg-transparent p-0 opacity-100'
                )}
              >
                {children?.map(({ title: itemTitle, slug: itemSlug }, sIndex) => {
                  return (
                    <li key={sIndex}>
                      <div
                        className={clsx(
                          'text-decoration-none cursor-pointer px-5 py-[10px] text-white hover:text-primary',
                          footer && 'block px-[5px] duration-200',
                          footer && 'opacity-60'
                        )}
                      >
                        {itemSlug ? (
                          <NavLink href={`/${itemSlug}`}>{itemTitle}</NavLink>
                        ) : (
                          itemTitle
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
