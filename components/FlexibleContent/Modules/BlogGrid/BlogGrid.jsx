import { sanityFetch } from 'lib/sanity.fetch'
import s from './BlogGrid.module.sass'
import { groq } from 'next-sanity'

export default async function BlogGrid({
    morePostsTitle
}) {
    const posts = await sanityFetch(`*[_type == "post"]{
        ...
    }`, {}, [])

    console.log('test')
    console.log(posts)

    return (
        <section className={s.Outer}>
            <h1>
                Blog grid
            </h1>
        </section>
    )
}