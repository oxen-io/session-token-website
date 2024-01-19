import clsx from 'clsx'
import s from './Post.module.sass'
import BlogTile from 'components/FlexibleContent/Modules/BlogGrid/BlogTile'
import PostContent from './PostContent'

export default function Post({
    post
}) {
    return (
        <section className={clsx(s.Outer, `Container Deep`)}>
            <BlogTile
                post={post}
                isFeatured
                isSingle
            />
            <PostContent post={post} />
        </section>
    )
}