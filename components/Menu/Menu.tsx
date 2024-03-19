'use client';

import clsx from 'clsx';

import NavLink from '@/components/NavLink/NavLink';

import s from './Menu.module.sass';

export default function Menu({
  menu,
  footer,
  closeMenu,
}: {
  menu: Array<{
    title: string;
    slug: string;
    children: Array<{
      title: string;
      slug: string;
    }>;
  }>;
  footer?: boolean;
  closeMenu?: () => void;
}) {
  if (!menu) {
    return null;
  }

  return (
    <ul className={clsx(s.Menu, footer ? s.Footer : '')}>
      {menu?.map(({ title, slug, children }, index) => {
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
          >
            <div className={s.Title}>
              {slug ? <NavLink href={`/${slug}`}>{title}</NavLink> : title}
            </div>
            {children && (
              <ul className={s.SubMenu}>
                {children?.map(({ title: itemTitle, slug: itemSlug }, sIndex) => {
                  return (
                    <li key={sIndex}>
                      <div className={s.Title}>
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
