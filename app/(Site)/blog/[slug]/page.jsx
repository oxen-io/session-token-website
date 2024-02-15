import {
    getDocumentBySlug,
    getDocumentPaths,
    getSettings,
} from 'lib/sanity.fetch'

import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import Post from 'components/Post/Post'
import PageWrapper from 'components/PageWrapper/PageWrapper'
import metadata from 'lib/metadata'
import generateRssFeed from 'lib/rss'

export async function generateMetadata({ params }) {
    const { slug } = params

    const [settings, page] = await Promise.all([
        getSettings(),
        getDocumentBySlug(slug, 'post'),
    ])

    return metadata(page, settings)
}

export async function generateStaticParams() {
    const allPosts = await getDocumentPaths('post')

    generateRssFeed(allPosts)

    return allPosts.map(({ slug }) => ({ slug: slug.current }))
}

export default async function BlogPost({ params }) {
    const data = await getDocumentBySlug(params.slug, 'post')

    const isDraft = draftMode().isEnabled

    if (!data && !isDraft) {
        notFound()
    }

    return (
        <PageWrapper>
            <Post post={data} />
        </PageWrapper>
    )
}
