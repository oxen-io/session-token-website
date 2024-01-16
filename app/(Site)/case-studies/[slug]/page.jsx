import { toPlainText } from '@portabletext/react'
import { CaseStudyPage } from 'components/pages/caseStudy/CaseStudyPage'
import CaseStudyPreview from 'components/pages/caseStudy/CaseStudyPreview'
import {
    getSettings,
    getDocumentBySlug,
    getDocumentPaths,
} from 'lib/sanity.fetch'
import { caseStudyBySlugQuery } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'

import PageComponents from 'components/PageComponents/PageComponents'

export const runtime = 'edge'

export async function generateMetadata({ params }) {
    const { slug } = params

    const [settings, topic] = await Promise.all([
        getSettings(),
        getDocumentBySlug(slug, 'caseStudy'),
    ])

    return {
        baseTitle: settings?.title ?? undefined,
        description: topic?.overview ? toPlainText(topic.overview) : '',
        image: topic?.coverImage,
        title: `${topic?.title} - ${settings?.title ?? undefined}`,
    }
}

export async function generateStaticParams() {
    const slugs = await getDocumentPaths('caseStudy')
    return slugs.map((slug) => ({ slug }))
}

export default async function CaseStudySlugRoute({ params }) {
    const [settings, data] = await Promise.all([
        getSettings(),
        getDocumentBySlug(params.slug, 'caseStudy'),
    ])

    if (!data && !draftMode().isEnabled) {
        notFound()
    }

    return (
        <LiveQuery
            enabled={draftMode().isEnabled}
            query={caseStudyBySlugQuery}
            params={params}
            initialData={data}
            as={CaseStudyPreview}
        >
            <PageComponents settings={settings}>
                <CaseStudyPage data={data} />
            </PageComponents>
        </LiveQuery>
    )
}
