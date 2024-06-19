'use client';

import type { CarouselContentSchemaType } from '@/schemas/objects/flexibleSections/tileCarousel';
import { PortableText } from '@portabletext/react';
import clsx from 'clsx';
import s from './TileCarousel.module.sass';

type TileCarouselTitle = {
  title?: string;
  content?: CarouselContentSchemaType;
  borderless?: boolean;
};

export const smallTitleClasses = ['text-sm *:text-sm text-text mb-4', 'lg:mb-6'];

export default function TileCarouselTitle(props: TileCarouselTitle) {
  const { title, content, borderless } = props;
  const hasScrollIconOnMobile = !content && !borderless;

  return (
    <>
      {content ? (
        <div className={(s.Content, 'TileCarouselTitle')}>
          <div className={clsx(smallTitleClasses, 'smallTitle')}>{title}</div>
          {content.title.length && <h2>{content?.title}</h2>}
          {content.copy.length && <PortableText value={content?.copy} />}
        </div>
      ) : borderless ? (
        <h2 className={clsx(smallTitleClasses)}>{title}</h2>
      ) : title ? (
        <div
          className={clsx(
            smallTitleClasses,
            'smallTitle',
            'relative flex items-center justify-between'
          )}
        >
          <h2>{title}</h2>
          {hasScrollIconOnMobile ? (
            <div className={clsx('-mt-px inline-flex items-center gap-1 opacity-50', 'lg:hidden')}>
              Scroll
              <svg
                width="35"
                height="8"
                viewBox="0 0 77 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M76.4998 3.79688L69.9998 0.0440984V7.54965L76.4998 3.79688ZM70.6498 3.14688L0.964111 3.14688V4.44687L70.6498 4.44687V3.14688Z"
                  fill="#fff"
                />
              </svg>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
