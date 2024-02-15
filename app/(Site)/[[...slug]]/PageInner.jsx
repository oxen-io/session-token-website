import { Page } from 'components/Page/Page'
import PageWrapper from 'components/PageWrapper/PageWrapper'

export default function PageInner({
    data,
    settings
}) {
    return (
        <PageWrapper>
            <Page data={data} settings={settings} />
        </PageWrapper>
    )
}