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
        'flex mr-auto gap-[15px]',
        footer && 'w-full max-w-[1000px] flex flex-wrap items-start gap-0 ml-[8%] pb-[100px]',
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
              footer ? 'w-1/3 flex-col justify-start items-start text-start' : 'items-center'
            )}
          >
            <div
              className={clsx(
                'text-white text-decoration-none px-5 py-[10px] hover:text-primary cursor-pointer',
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
                  'hover:opacity-100 hover:visible w-full w-min-[300px] bg-red-500 absolute top-[40px] left-0 p-[20px] m-0 opacity-0 hidden duration-200',
                  footer && 'min-w-0 bg-transparent absolute top-[31px] p-0 opacity-100 visible'
                )}
              >
                {children?.map(({ title: itemTitle, slug: itemSlug }, sIndex) => {
                  return (
                    <li key={sIndex}>
                      <div
                        className={clsx(
                          'text-white text-decoration-none px-5 py-[10px] hover:text-primary cursor-pointer',
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
