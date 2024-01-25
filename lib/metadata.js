import { urlForImage } from "./sanity.image"

export default (obj, settings) => {
    const { metadata: {
        title,
        description = '',
        ogpImage
    } } = obj

    const ogpImageUrl = ogpImage ? urlForImage(ogpImage).url() : undefined

    const _title = `${title} - ${settings?.title ?? undefined}`

    return {
        baseTitle: settings?.title ?? undefined,
        description,
        "opengraph-image": ogpImageUrl,
        title: _title,
        openGraph: {
            title: _title,
            description,
            images: [
                {
                    url: ogpImageUrl,
                }
            ]
        }
    }
}