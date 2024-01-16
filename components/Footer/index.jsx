import { getSettings, getTopics } from 'lib/sanity.fetch'
import { settingsQuery } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import { LiveQuery } from 'next-sanity/preview/live-query'

import FooterLayout from './FooterLayout'
import FooterPreview from './FooterPreview'

export async function Footer() {
    const [topics, data] = await Promise.all([getTopics(), getSettings()])

    return (
        <LiveQuery
            enabled={draftMode().isEnabled}
            query={settingsQuery}
            initialData={data}
            as={FooterPreview}
        >
            <FooterLayout data={data} topics={topics} />
        </LiveQuery>
    )
}
