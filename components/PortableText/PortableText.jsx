import { PortableText as DefaultPortableText } from '@portabletext/react'
import { urlForImage } from 'lib/sanity.image'

const Image = ({ value }) => {
    const imageUrl = urlForImage(value).url()

    return (
        <img src={imageUrl} alt={''} />
    )
}

const IFrame = ({ value }) => {
    const { embedCode } = value

    if (!embedCode) {
        return null
    }

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: embedCode
            }}
        />
    )
}

export default function PortableText(props) {
    return (
        <DefaultPortableText
            {...props}
            components={{
                types: {
                    image: Image,
                    iframe: IFrame
                }
            }}
        />
    )
}