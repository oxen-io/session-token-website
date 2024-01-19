import { sanityFetch } from 'lib/sanity.fetch'
import s from './BlogGrid.module.sass'
import BlogTile from './BlogTile'
import clsx from 'clsx'
import BlogGridInner from './BlogGridInner'

export default async function BlogGrid({
    morePostsTitle
}) {

    const posts = await sanityFetch({
        query: `*[_type == "post"]{
            ...,
            author->,
        }`,
        tags: []
    })

    const postsWithoutFirst = posts.slice(1)

    return (
        <section
            className={clsx(s.Outer, `Container Deep`)}
        >
            <BlogTile
                post={posts[0]}
                isFeatured
            />
            <div className={s.Grid}>
                <h5>
                    {morePostsTitle}
                </h5>
                <BlogGridInner
                    posts={postsWithoutFirst}
                />
            </div>
        </section>
    )
}