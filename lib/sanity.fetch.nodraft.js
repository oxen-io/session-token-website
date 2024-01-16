export const maxDuration = 300

import { client } from 'lib/sanity.client'
import {
    pagesBySlugQuery,
    settingsQuery,
    documentPaths,
} from 'lib/sanity.queries'

import { revalidateSecret } from './sanity.api'

export const token = process.env.SANITY_API_READ_TOKEN

const DEFAULT_PARAMS = {}
const DEFAULT_TAGS = []

export async function sanityFetch({
    query,
    params = DEFAULT_PARAMS,
    tags = DEFAULT_TAGS,
}) {
    const isDraftMode = false
    if (isDraftMode && !token) {
        throw new Error(
            'The `SANITY_API_READ_TOKEN` environment variable is required.',
        )
    }

    // @TODO this won't be necessary after https://github.com/sanity-io/client/pull/299 lands
    const sanityClient =
        client.config().useCdn && isDraftMode
            ? client.withConfig({ useCdn: false })
            : client
    return sanityClient.fetch(query, params, {
        // We only cache if there's a revalidation webhook setup
        cache: revalidateSecret ? 'force-cache' : 'no-store',
        ...(isDraftMode && {
            cache: undefined,
            token: token,
            perspective: 'previewDrafts',
        }),
        next: {
            ...(isDraftMode && { revalidate: 30 }),
            tags,
        },
    })
}

export function getSettings() {
    return sanityFetch({
        query: settingsQuery,
        tags: ['settings', 'page', 'topic'],
    })
}

export function getDocumentBySlug(slug, type) {
    let query = null
    switch (type) {
    case 'page':
        query = pagesBySlugQuery
        break
    default:
        throw new Error(`Unknown type: ${type}`)
    }
    return sanityFetch({
        query,
        params: { slug },
        tags: [`${type}:${slug}`],
    })
}

export function getDocumentPaths(type) {
    return client.fetch(
        documentPaths(type),
        {},
        { token, perspective: 'published' },
    )
}