import 'styles/Global.sass'
import 'styles/Reset.sass'

import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import { token } from 'lib/sanity.fetch'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'

const PreviewProvider = dynamic(() =>
    import('components/preview/PreviewProvider'),
)

export default async function IndexRoute({ children }) {
    const isDraftMode = draftMode().isEnabled

    const layout = (
        <div>
            {isDraftMode && <PreviewBanner />}
            <Suspense>
                <Header />
                {children}
                <Footer />
            </Suspense>
        </div>
    )

    if (isDraftMode) {
        return <PreviewProvider token={token}>{layout}</PreviewProvider>
    }

    return layout
}
