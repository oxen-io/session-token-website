
import { Page } from 'components/Page/Page'

import {
    getDocumentBySlug,
    getDocumentPaths,
    getSettings,
} from 'lib/sanity.fetch'
import { pageBySlugQuery } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'
import Post from 'components/Post/Post'

export const runtime = 'edge'

export async function generateMetadata({ params }) {
    const { slug } = params

    const [settings, page] = await Promise.all([
        getSettings(),
        getDocumentBySlug(params.slug, 'post'),
    ])

    return {
        baseTitle: settings?.title ?? undefined,
        description: `Session Token`,
        image: settings?.ogImage,
        title: `${page?.title} - ${settings?.title ?? undefined}`,
    }
}

export async function generateStaticParams() {
    const slugs = await getDocumentPaths('post')
    return slugs.map((slug) => ({ slug }))
}

export default async function BlogPost({ params }) {
    const data = await getDocumentBySlug(params.slug, 'post')

    const isDraft = draftMode().isEnabled

    if (!data && !draftMode().isEnabled) {
        notFound()
    }

    const inner = (
        <Post post={data} />
    )

    if (!isDraft) {
        return inner
    }

    return (
        <LiveQuery
            enabled={draftMode().isEnabled}
            query={pageBySlugQuery}
            params={params}
            initialData={data}
            as={PagePreview}
        >
            {inner}
        </LiveQuery>
    )
}
