'use client';

import clsx from 'clsx';

import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/navigation';
import 'swiper/scss';
import 'swiper/scss/a11y';

import PortableText from '@/components/PortableText/PortableText';

import Button from '@/components/Button/Button';
import ImageBox from '@/components/ImageBox/ImageBox';

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import NavLink from '@/components/NavLink/NavLink';
import { createSanityLink } from '@/lib/sanity.links';
import type {
  CarouselContentSchemaType,
  TileCarouselSchemaType,
  TileSchemaType,
} from '@/schemas/objects/flexibleSections/tileCarousel';
import type { A11yOptions } from 'swiper/types';
import s from './TileCarousel.module.sass';

function parseString(potentialString: string | number | undefined | null): string | undefined {
  if (typeof potentialString === 'string') {
    return potentialString;
  }

  if (typeof potentialString === 'number') {
    return potentialString.toString();
  }

  return undefined;
}

const filterA11yOptions = (
  options: A11yOptions
): A11yOptions & {
  id: string | undefined;
} => {
  const { id, ...rest } = options;

  return {
    id: parseString(id),
    ...rest,
  };
};

export default function TileCarousel({
  title,
  content: _content,
  tiles: _tiles,
  borderless,
}: TileCarouselSchemaType) {
  const tiles = _tiles as Array<TileSchemaType>;
  const content = _content as CarouselContentSchemaType;

  const hasScrollIconOnMobile = !content && !borderless;

  const [OuterElement, outerElementProps, InnerElement] = (() => {
    if (borderless) {
      return ['ul', {} as A11yOptions, 'li'];
    }
    return [
      Swiper,
      {
        modules: [A11y, Navigation],
        spaceBetween: 20,
        slidesPerView: content ? 1.2 : 1,
        a11y: true,
        allowTouchMove: true,
        navigation: true,
        breakpoints: {
          1024: {
            slidesPerView: content ? 3 : 2.85,
            allowTouchMove: false,
          },
        },
      } as A11yOptions,
      SwiperSlide,
    ];
  })();

  return (
    <section className={clsx(s.TileCarousel, content && s.HasContent, borderless && s.Borderless)}>
      <div className={clsx(s.Cont, 'Container')}>
        {content ? (
          <div className={s.Content}>
            <div className="smallTitle">{title}</div>
            {content.title.length && (
              <h2
                dangerouslySetInnerHTML={{
                  __html: content?.title,
                }}
              />
            )}
            {content.copy.length && <PortableText value={content.copy} />}
          </div>
        ) : borderless ? (
          <h2
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        ) : title ? (
          <div className="smallTitle">
            <PortableText value={title} />
            {hasScrollIconOnMobile ? (
              <div className={s.ScrollIcon}>
                Scroll
                <svg
                  width="77"
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
        <div className={s.Slider}>
          <OuterElement {...filterA11yOptions(outerElementProps)}>
            {tiles?.map((tile, index) => {
              const {
                preTitle,
                title: tileTitle,
                copy,
                image,
                fullSizeImage,
                linkLabel,
                link,
              } = tile;

              const inside = (
                <>
                  {image && (
                    <div className={s.Image}>
                      <ImageBox image={image} />
                    </div>
                  )}
                  <div className={s.TileContent}>
                    {preTitle && <div className="smallTitle">{preTitle}</div>}
                    {content ? (
                      <h4>
                        {tileTitle}
                        <span>↗</span>
                      </h4>
                    ) : (
                      <h2 dangerouslySetInnerHTML={{ __html: tileTitle }} />
                    )}
                    <p>{copy}</p>
                    {linkLabel && (
                      <Button
                        title={linkLabel}
                        link={createSanityLink(link, linkLabel)}
                        isPrimary={fullSizeImage}
                        hasArrow={!!link}
                        disabled={!link}
                      />
                    )}
                  </div>
                </>
              );

              return (
                <InnerElement key={index}>
                  <AnimatedElement
                    className={clsx(s.Slide, fullSizeImage ? s.FullSizeImage : '')}
                    delay={index * 100 + 100}
                  >
                    {!link || linkLabel ? (
                      <div>{inside}</div>
                    ) : (
                      <NavLink href={link}>{inside}</NavLink>
                    )}
                  </AnimatedElement>
                </InnerElement>
              );
            })}
          </OuterElement>
        </div>
      </div>
    </section>
  );
}
