import clsx from 'clsx';
import Link from 'next/link';

import { urlForImage } from '@/lib/sanity.image';
import moment from 'moment';
import Image from 'next/image';

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import type { Post } from '@/schemas/documents/post';
import s from './BlogTile.module.sass';

export default function BlogTile({
  post: { author, excerpt, title, featuredImage, slug, datePosted },
  isFeatured,
  isSingle,
}: {
  post: Post;
  isFeatured?: boolean;
  isSingle?: boolean;
}) {
  const imageUrl = urlForImage(featuredImage)?.url();

  if (!imageUrl) {
    throw new Error(`No image URL for ${title}`);
  }

  const Element = isSingle ? 'div' : Link;

  return (
    <Element
      href={`/blog/${slug.current}`}
      className={clsx(
        s.Outer,
        isFeatured && s.Featured,
        isSingle && s.Single,
        !isSingle && 'hover:brightness-125 transition-all',
        'group'
      )}
    >
      <AnimatedElement className={s.Image} type="div" delay={100} disabled={!isFeatured}>
        <Image src={imageUrl} width={560} height={345} alt={`Featured image for ${title}`} />
      </AnimatedElement>
      <AnimatedElement className={s.Content} type="div" delay={200} disabled={!isFeatured}>
        <h3 className={clsx(!isSingle && 'group-hover:text-primary')}>{title}</h3>
        <div className={s.Meta}>
          <span>{moment(datePosted).format(`MMMM D, YYYY`)}</span>
          {author && (
            <span>
              {` `}/ {author.title}
            </span>
          )}
        </div>
        <p className={s.Excerpt}>{excerpt}</p>
        {!isSingle ? (
          <span className={clsx(s.LinkLabel, 'group-hover:underline')}>Read More</span>
        ) : null}
      </AnimatedElement>
    </Element>
  );
}
