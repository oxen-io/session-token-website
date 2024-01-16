import { getSettings } from 'lib/sanity.fetch'
import { settingsQuery } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import { LiveQuery } from 'next-sanity/preview/live-query'

import HeaderLayout from './HeaderLayout'
import HeaderPreview from './HeaderPreview'

export async function Header() {
    const settings = await getSettings()

    return (
        <LiveQuery
            enabled={draftMode().isEnabled}
            query={settingsQuery}
            initialData={settings}
            as={HeaderPreview}
        >
            <HeaderLayout settings={settings} />
        </LiveQuery>
    )
}
