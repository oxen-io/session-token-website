import { PortableText as DefaultPortableText } from '@portabletext/react'
import { urlForImage } from 'lib/sanity.image'

const Image = ({ value }) => {
    const imageUrl = urlForImage(value).url()

    return (
        <img src={imageUrl} alt={''} />
    )
}

export default function PortableText(props) {
    return (
        <DefaultPortableText
            {...props}
            components={{
                types: {
                    image: Image
                }
            }}
        />
    )
}