import { toPlainText } from '@portabletext/react'
import { Page } from 'components/pages/page/Page'
import PagePreview from 'components/pages/page/PagePreview'
import {
    getDocumentBySlug,
    getDocumentPaths,
    getSettings,
} from 'lib/sanity.fetch'
import { pagesBySlugQuery } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'

import PageComponents from 'components/PageComponents/PageComponents'

export const runtime = 'edge'

export async function generateMetadata() {
    const [settings, page] = await Promise.all([
        getSettings(),
        getDocumentBySlug('home', 'page'),
    ])

    return {
        baseTitle: settings?.title ?? undefined,
        description: page?.overview ? toPlainText(page.overview) : '',
        image: settings?.ogImage,
        title: `${page?.title}${settings?.title ? ` | ${settings.title}` : ''}`,
    }
}

export async function generateStaticParams() {
    const slugs = await getDocumentPaths('page')
    return slugs.map((slug) => ({ slug }))
}

export default async function PageSlugRoute({ params }) {
    const [settings, data] = await Promise.all([
        getSettings(),
        getDocumentBySlug('home', 'page'),
    ])

    if (!data && !draftMode().isEnabled) {
        notFound()
    }


    return (
        <LiveQuery
            enabled={draftMode().isEnabled}
            query={pagesBySlugQuery}
            params={params}
            initialData={data}
            as={PagePreview}
        >
            <PageComponents settings={settings}>
                <Page data={data} settings={settings} />
            </PageComponents>
        </LiveQuery>
    )
}
