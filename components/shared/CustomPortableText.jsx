import { PortableText } from '@portabletext/react'
import ImageBox from 'components/shared/ImageBox'

import { getLinkUrl } from 'lib/sanity.links'
import NavLink from 'components/NavLink/NavLink'

export function CustomPortableText({ value }) {
    const components = {
        block: {
            normal: ({ children }) => {
                return <p>{children}</p>
            },
        },
        marks: {
            link: ({ children, value }) => {
                const href = getLinkUrl(value)

                if (href) return <NavLink href={href}>{children}</NavLink>
            },
        },
        types: {
            portableImage: ({ value }) => {
                return (
                    <div className={'image'}>
                        <ImageBox image={value.image} />
                        {value?.caption && <span>{value.caption}</span>}
                    </div>
                )
            },
            quote: ({ value: { quote, author, location } }) => {
                return (
                    <figure>
                        {quote && (
                            <blockquote
                                dangerouslySetInnerHTML={{
                                    __html: `“ ${quote} ”`,
                                }}
                            />
                        )}
                        <figcaption>
                            {author && <p>{author}</p>}
                            {location && <p>{location}</p>}
                        </figcaption>
                    </figure>
                )
            },
        },
    }

    return <PortableText components={components} value={value} />
}
