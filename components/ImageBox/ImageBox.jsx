import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

export default function ImageBox({
    image,
    width = 3500,
    height = 2000,
    size = "100vw",
    loading = "lazy",
    blur,
    className = "",
}) {
    if (!image) return null

    const altText = image ? (image.alt ? image.alt : "") : ""
    const imageUrl = image?.asset?.url
        ? image?.asset?.url
        : urlForImage(image)?.url()
    const blurImage = image?.asset?.metadata?.lqip
        ? image?.asset?.metadata?.lqip
        : null

    const keyStr =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

    const triplet = (e1, e2, e3) =>
        keyStr.charAt(e1 >> 2) +
        keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
        keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
        keyStr.charAt(e3 & 63)

    const rgbDataURL = (r, g, b) =>
        `data:image/gif;base64,R0lGODlhAQABAPAA${
            triplet(0, r, g) + triplet(b, 255, 255)
        }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

    return (
        <div className={className}>
            {image && (
                <Image
                    alt={altText}
                    width={width}
                    height={height}
                    sizes={size}
                    src={imageUrl}
                    loading={loading}
                    placeholder={blur ? "blur" : "empty"}
                    blurDataURL={blur ? rgbDataURL(208, 209, 210) : null}
                />
            )}
        </div>
    )
}
