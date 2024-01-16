import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'

/**
 * All the shared stuff that goes into <head> on `(personal)` routes, can be be imported by `page.tsx` files and used by `generateMetadata` functions.
 */
export function defineMetadata({ baseTitle, description, image, title }) {
    const metaTitle = [
        ...(title ? [title] : []),
        ...(baseTitle ? [baseTitle] : []),
    ].join(' | ')

    const imageUrl =
        image && urlForImage(image)?.width(1200).height(627).fit('crop').url()

    return {
        title: metaTitle || demo.title,
        description,
        openGraph: imageUrl
            ? {
                images: [imageUrl],
            }
            : undefined,
    }
}
