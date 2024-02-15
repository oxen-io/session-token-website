

import {
    getDocumentBySlug,
    getDocumentPaths,
    getSettings,
} from 'lib/sanity.fetch'
import { pageBySlugQuery } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'
import metadata from 'lib/metadata'

import PageInner from './PageInner'
import PagePreview from './PagePreview'

export async function generateMetadata({ params }) {
    const { slug } = params

    const [settings, page] = await Promise.all([
        getSettings(),
        getDocumentBySlug(slug?.[0] || 'coming-soon', 'page'),
    ])

    return metadata(page, settings)
}

export async function generateStaticParams() {
    const slugs = await getDocumentPaths('page')
    const allPages = slugs.map((slug) => ({ slug }))

    return allPages.map(({ slug }) => ({ slug: slug.current }))
}

export default async function PageSlugRoute({ params }) {
    const [settings, data] = await Promise.all([
        getSettings(),
        getDocumentBySlug(params.slug?.[0] || 'coming-soon', 'page'),
    ])

    const isDraft = draftMode().isEnabled

    if (!data && !isDraft) {
        notFound()
    }
    
    return (
        <PageInner data={data} settings={settings} />
    )
}
