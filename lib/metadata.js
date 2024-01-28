import { urlForImage } from "./sanity.image"

export default (obj, settings) => {
    const {
        title,
        metadata
    } = obj

    const {
        title: metaTitle,
        description = '',
        ogpImage
    } = metadata || {}

    const ogpImageUrl = ogpImage && urlForImage(ogpImage)?.width(1200).height(627).fit('crop').url()

    const _title = `${metaTitle || title} - ${settings?.title || undefined}`

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