import clsx from 'clsx'
import s from './Post.module.sass'
import BlogTile from 'components/FlexibleContent/Modules/BlogGrid/BlogTile'
import PostContent from './PostContent'
import Link from 'next/link'

export default function Post({
    post
}) {
    return (
        <section className={clsx(s.Outer, `Container Deep`)}>
            <div className={s.BackLink}>
                <Link href={'/blog'}>
                    ← Back to blog
                </Link>
            </div>
            <BlogTile
                post={post}
                isFeatured
                isSingle
            />
            <PostContent post={post} />
        </section>
    )
}