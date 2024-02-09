import 'server-only'

export const maxDuration = 300

import { client } from 'lib/sanity.client'
import {
    pagePaths,
    pageBySlugQuery,
    settingsQuery,
    documentPaths,
    postBySlugQuery,
} from 'lib/sanity.queries'
import { draftMode } from 'next/headers'

import { revalidateSecret } from './sanity.api'

export const token = process.env.SANITY_API_READ_TOKEN

const DEFAULT_PARAMS = {}
const DEFAULT_TAGS = []

export async function sanityFetch({
    query,
    params = DEFAULT_PARAMS,
    tags = DEFAULT_TAGS,
}) {
    let isDraftMode = false

    try {
        isDraftMode = draftMode().isEnabled
    }catch(e){
        // throws on generateStaticParams
    }

    if (isDraftMode && !token) {
        throw new Error(
            'The `SANITY_API_READ_TOKEN` environment variable is required.',
        )
    }

    const sanityClient = client.config().useCdn && isDraftMode ? client.withConfig({ useCdn: false }) : client

    return sanityClient.fetch(query, params, {
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
            query = pageBySlugQuery
            break
        case 'post':
            query = postBySlugQuery
            break
        default:
            throw new Error(`Unknown type: ${type}`)
    }
    return sanityFetch({
        query,
        params: { slug },
        tags: [`${type}:${slug}`, type],
    })
}

export function getDocumentPaths(type) {
    return sanityFetch({
        query: documentPaths(type),
        tags: [type],
    })
}
