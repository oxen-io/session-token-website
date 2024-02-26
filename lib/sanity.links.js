export function resolveHref(documentType, slug) {
    switch (documentType) {
    case 'page':
        return slug ? `/${slug}` : undefined
    case 'post':
        return slug ? `/blog/${slug}` : undefined
    default:
        console.warn('Invalid document type:', documentType)
        return undefined
    }
}

export const getLinkUrl = (link) => {
    if (!link) return null

    const { internalLink, linkType, href } = link

    if (linkType === 'internal') {
        return resolveHref(internalLink._type, internalLink.slug)
    } else if (linkType === 'external') {
        return href
    } else {
        return null
    }
}
