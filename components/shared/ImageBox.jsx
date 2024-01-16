import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

export default function ImageBox({
    image,
    width = 3500,
    height = 2000,
    size = '100vw',
    loading = 'lazy',
}) {
    const altText = image ? (image.alt ? image.alt : '') : ''
    const imageUrl = image?.asset?.url
        ? image?.asset?.url
        : urlForImage(image)?.url()
    const blurImage = image?.asset?.metadata?.lqip
        ? image?.asset?.metadata?.lqip
        : null

    return (
        <div>
            {image && (
                <Image
                    alt={altText}
                    width={width}
                    height={height}
                    sizes={size}
                    src={imageUrl}
                    placeholder={blurImage && image?.blur ? 'blur' : 'empty'}
                    blurDataURL={blurImage && image?.blur ? blurImage : null}
                    loading={loading}
                />
            )}
        </div>
    )
}
