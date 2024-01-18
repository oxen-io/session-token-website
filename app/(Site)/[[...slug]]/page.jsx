import { toPlainText } from '@portabletext/react'
import { Page } from 'components/Page/Page'

import {
    getDocumentBySlug,
    getDocumentPaths,
    getSettings,
} from 'lib/sanity.fetch'
import { pagesBySlugQuery } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'

export const runtime = 'edge'

export async function generateMetadata({ params }) {
    const { slug } = params

    const [settings, page] = await Promise.all([
        getSettings(),
        getDocumentBySlug(params.slug?.[0] || 'home', 'page'),
    ])

    return {
        baseTitle: settings?.title ?? undefined,
        description: `Session Token`,
        image: settings?.ogImage,
        title: `${page?.title} - ${settings?.title ?? undefined}`,
    }
}

export async function generateStaticParams() {
    const slugs = await getDocumentPaths('page')
    return slugs.map((slug) => ({ slug }))
}

export default async function PageSlugRoute({ params }) {
    const [settings, data] = await Promise.all([
        getSettings(),
        getDocumentBySlug(params.slug?.[0] || 'home', 'page'),
    ])

    const isDraft = draftMode().isEnabled

    if (!data && !draftMode().isEnabled) {
        notFound()
    }

    const inner = (
        <Page data={data} settings={settings} />
    )

    if (!isDraft) {
        return inner
    }

    return (
        <LiveQuery
            enabled={draftMode().isEnabled}
            query={pagesBySlugQuery}
            params={params}
            initialData={data}
            as={PagePreview}
        >
            {inner}
        </LiveQuery>
    )
}
