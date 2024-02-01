import { sanityFetch } from 'lib/sanity.fetch'
import s from './BlogGrid.module.sass'
import BlogTile from './BlogTile'
import clsx from 'clsx'
import BlogGridInner from './BlogGridInner'
import { AnimatedElement } from 'components/AnimatedComponent/AnimatedComponent'

export default async function BlogGrid({
    morePostsTitle
}) {
    const posts = await sanityFetch({
        query: `*[_type == "post"]{
            ...,
            author->,
        }`,
        tags: ['post']
    })

    const sortedPosts = posts.sort((a, b) => {
        const aDate = new Date(a.datePosted || a._createdAt)
        const bDate = new Date(b.datePosted || b._createdAt)

        return bDate - aDate
    })

    const postsWithoutFirst = sortedPosts.slice(1)

    return (
        <section
            className={clsx(s.Outer, `Container Deep`)}
        >
            <BlogTile
                post={sortedPosts[0]}
                isFeatured
            />
            <div className={s.Grid}>
                <AnimatedElement
                    type='h5'
                    delay={300}
                >
                    {morePostsTitle}
                </AnimatedElement>
                <BlogGridInner
                    posts={postsWithoutFirst}
                />
            </div>
        </section>
    )
}