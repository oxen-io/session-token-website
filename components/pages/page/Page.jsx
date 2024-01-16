import FlexibleContent from 'components/FlexibleContent/FlexibleContent'

import PageComponents from 'components/PageComponents/PageComponents'

export function Page({ data, settings }) {
    console.log("DATA!!!!!!!!!!!!!!!!!!!!!!!!", data.modules[0]._type);
    // Default to an empty object to allow previews on non-existent documents
    const { modules } = data ?? {}

    return (
        <PageComponents settings={settings} data={data} slug={data?.slug?.current}>
            <FlexibleContent rows={modules} settings={settings} />
        </PageComponents>
    )
}

export default Page
