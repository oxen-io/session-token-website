import { token } from 'lib/sanity.fetch'
import { resolveHref } from 'lib/sanity.links'
import { draftMode } from 'next/headers'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const documentType = searchParams.get('type')

    if (!token) {
        throw new Error(
            'The `SANITY_API_READ_TOKEN` environment variable is required.',
        )
    }

    const href = resolveHref(documentType, slug)
    if (!href) {
        return new Response(
            'Unable to resolve preview URL based on the current document type and slug',
            { status: 400 },
        )
    }

    console.log('ENABLING DRAFT')

    draftMode().enable()

    return new Response(null, {
        status: 307,
        headers: {
            Location: href,
        },
    })
}
