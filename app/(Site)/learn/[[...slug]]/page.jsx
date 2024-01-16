import { toPlainText } from '@portabletext/react'
import { TopicPage } from 'components/pages/topic/TopicPage'
import TopicPreview from 'components/pages/topic/TopicPreview'
import {
    getSettings,
    getDocumentBySlug,
    getDocumentPaths,
} from 'lib/sanity.fetch'
import { topicBySlugQuery  } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'

export const runtime = 'edge'

export async function generateMetadata({ params }) {
    const { slug } = params

    const reformatSlug = (_slug) => {
        const __slug = decodeURIComponent(_slug)?.split('/')
        return __slug?.[__slug?.length - 1]
    }

    let slugs = []

    slug?.forEach((_slug) => {
        slugs?.push(reformatSlug(_slug))
    })

    const [settings, topic] = await Promise.all([
        getSettings(),
        getDocumentBySlug(slugs[slugs?.length - 1], 'topic'),
    ])

    return {
        baseTitle: settings?.title ?? undefined,
        description: topic?.overview ? toPlainText(topic.overview) : '',
        title: `${topic?.title} - ${settings?.title ?? undefined}`,
    }
}

export async function generateStaticParams() {
    const slugs = await getDocumentPaths('topic')

    return slugs.map((slug) => ({ slug }))
}

export default async function TopicSlugRoute({ params }) {
    const { slug } = params

    const reformatSlug = (_slug) => {
        const __slug = decodeURIComponent(_slug)?.split('/')
        return __slug?.[__slug?.length - 1]
    }

    let slugs = []

    slug?.forEach((_slug) => {
        slugs?.push(reformatSlug(_slug))
    })

    const [settings, data] = await Promise.all([
        getSettings(),
        getDocumentBySlug(slugs[slugs?.length - 1], 'topic'),
    ])

    if (!data && !draftMode().isEnabled) {
        notFound()
    }

    const previewParams = {
        slug: slugs[slugs?.length - 1],
    }

    return (
        <LiveQuery
            enabled={draftMode().isEnabled}
            query={topicBySlugQuery}
            params={previewParams}
            initialData={data}
            as={TopicPreview}
        >
            <TopicPage data={data} settings={settings}/>
        </LiveQuery>
    )
}
