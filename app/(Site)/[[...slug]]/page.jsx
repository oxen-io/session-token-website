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
import PageWrapper from 'components/PageWrapper/PageWrapper'
import metadata from 'lib/metadata'

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

    if (!data && !draftMode().isEnabled) {
        notFound()
    }

    const inner = (
        <PageWrapper>
            <Page data={data} settings={settings} />
        </PageWrapper>
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
