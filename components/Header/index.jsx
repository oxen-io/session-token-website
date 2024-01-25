
import { settingsQuery } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import { LiveQuery } from 'next-sanity/preview/live-query'

import HeaderLayout from './HeaderLayout'
import HeaderPreview from './HeaderPreview'

export async function Header() {
    return (
        <LiveQuery
            enabled={draftMode().isEnabled}
            query={settingsQuery}
            as={HeaderPreview}
        >
            <HeaderLayout />
        </LiveQuery>
    )
}
