import clsx from 'clsx';
import Link from 'next/link';

import { urlForImage } from '@/lib/sanity.image';
import moment from 'moment';

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import ImageBox from '@/components/ImageBox/ImageBox';
import { SLUG } from '@/lib/constants';
import type { PostSchemaType } from '@/schemas/documents/post';
import s from './PostTile.module.sass';
import {log} from "@/lib/logger";

export default function PostTile({
  post: { author, excerpt, title, featuredImage, slug, datePosted },
  isFeatured,
  isSingle,
  isTitle,
}: {
  post: PostSchemaType;
  isFeatured?: boolean;
  isSingle?: boolean;
  isTitle?: boolean;
}) {
  const imageUrl = urlForImage(featuredImage)?.url();


  if (!imageUrl) {
    log.error(`No image URL for ${title}`);
  }

  const Element = isSingle ? 'div' : Link;

  return (
    <Element
      href={`/${SLUG.POSTS}/${slug.current}`}
      className={clsx(
        s.Outer,
        isSingle ? 'flex flex-col-reverse' : 'grid grid-cols-1 gap-5',
        isFeatured && 'lg:grid lg:grid-cols-2 lg:gap-10',
        !isSingle && !isTitle && 'transition-all hover:brightness-125',
        'group'
      )}
    >
      <AnimatedElement
        className={clsx(s.Image, isSingle && 'w-full')}
        type="div"
        delay={100}
        disabled={!isFeatured}
      >
        {imageUrl ?
          <ImageBox
            className={clsx('w-full')}
            src={imageUrl}
            width={560}
            height={345}
            alt={`Featured image for ${title}`}
          />
        : null}
      </AnimatedElement>
      <AnimatedElement
        className={clsx(isFeatured && 'flex flex-col justify-center')}
        type="div"
        delay={200}
        disabled={!isFeatured}
      >
        <h3 className={clsx('text-4xl', !isSingle && 'group-hover:text-primary')}>{title}</h3>
        <div className={s.Meta}>
          <span>{moment(datePosted).format(`MMMM D, YYYY`)}</span>
          {author && (
            <span>
              {` `}/ {author.title}
            </span>
          )}
        </div>
        <p className={clsx('text-lg')}>{excerpt}</p>
        {!isSingle ? (
          <span className={clsx(s.LinkLabel, 'group-hover:underline')}>Read More</span>
        ) : null}
      </AnimatedElement>
    </Element>
  );
}
