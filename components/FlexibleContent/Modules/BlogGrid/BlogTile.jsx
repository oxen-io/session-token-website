import Link from 'next/link'
import s from './BlogTile.module.sass'
import clsx from 'clsx'

import moment from 'moment'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

import { AnimatedElement } from 'components/AnimatedComponent/AnimatedComponent'

export default function BlogTile({
    post: {
        author,
        excerpt,
        title,
        featuredImage,
        slug,
        _createdAt,
        datePosted
    },
    isFeatured,
    isSingle
}) {
    const imageUrl = urlForImage(featuredImage).url()

    const Element = isSingle ? 'div' : Link

    return (
        <Element
            href={`/blog/${slug.current}`}
            className={clsx(s.Outer, {
                [s.Featured]: isFeatured,
                [s.Single]: isSingle
            })}
        >
            <AnimatedElement
                className={s.Image}
                type='div'
                delay={100}
                disabled={!isFeatured}
            >
                <Image
                    src={imageUrl}
                    width={560}
                    height={345}
                    alt={`Featured image for ${title}`}
                />
            </AnimatedElement>
            <AnimatedElement
                className={s.Content}
                type='div'
                delay={200}
                disabled={!isFeatured}
            >
                <h3>
                    {title}
                </h3>
                <div className={s.Meta}>
                    <span>
                        {moment(datePosted || _createdAt).format(`MMMM D, YYYY`)}
                    </span>
                    {author &&
                        <span>
                            {` `}/ {author.title}
                        </span>
                    }
                </div>
                <p className={s.Excerpt}>
                    {excerpt}
                </p>
                {!isSingle ?
                    <span className={s.LinkLabel}>
                        Read More
                    </span>
                    : null}
            </AnimatedElement>
        </Element>
    )
}