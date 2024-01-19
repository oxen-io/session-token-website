'use client'

import Link from 'next/link'
import s from './BlogTile.module.sass'
import clsx from 'clsx'

import moment from 'moment'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

export default function BlogTile({
    post: {
        author,
        excerpt,
        title,
        featuredImage,
        copy,
        slug,
        _createdAt
    },
    isFeatured
}) {
    const imageUrl = urlForImage(featuredImage).url()

    return (
        <Link
            href={`/blog/${slug.current}`}
            className={clsx(s.Outer, {
                [s.Featured]: isFeatured
            })}
        >
            <Image
                src={imageUrl}
                width={560}
                height={345}
                alt={`Featured image for ${title}`}
                className={s.Image}
            />
            <div className={s.Content}>
                <h3>
                    {title}
                </h3>
                <div className={s.Meta}>
                    <span>
                        {moment(_createdAt).format(`MMMM D, YYYY`)}
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
                <span className={s.LinkLabel}>
                    Read More
                </span>
            </div>
        </Link>
    )
}