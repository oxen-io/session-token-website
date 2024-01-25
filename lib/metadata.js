import { urlForImage } from "./sanity.image"

export default (obj, settings) => {
    const {
        title,
        metadata: {
            title: metaTitle,
            description = '',
            ogpImage
        } } = obj

    const ogpImageUrl = ogpImage ? urlForImage(ogpImage).url() : undefined

    const _title = `${metaTitle || title} - ${settings?.title ?? undefined}`

    return {
        description,
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