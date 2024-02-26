/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import './custom.css'

import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, previewSecretId, projectId } from 'lib/sanity.api'
import { pageStructure, singletonPlugin } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import Iframe, { defineUrlResolver } from 'sanity-plugin-iframe-pane'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'

import page from 'schemas/documents/page'
import settings from 'schemas/singletons/settings'

import schema from 'schemas/schema'
import post from 'schemas/documents/post'

const title =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
    'YC Next.js + Sanity Starter'

export const PREVIEWABLE_DOCUMENT_TYPES = [
    page.name,
    post.name
]

export const PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS = [
    page.name,
    post.name
]

// Used to generate URLs for drafts and live previews
export const PREVIEW_BASE_URL = '/api/draft'

export const urlResolver = defineUrlResolver({
    base: PREVIEW_BASE_URL,
    requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
})

export const iframeOptions = {
    url: urlResolver,
    urlSecretId: previewSecretId,
}

export default defineConfig({
    basePath: '/admin',
    projectId: projectId || '',
    dataset: dataset || '',
    title,
    schema: {
        // If you want more content types, you can add them to this array
        types: schema

    },
    plugins: [
        deskTool({
            structure: pageStructure([settings]),
            defaultDocumentNode: (S, { schemaType }) => {
                if (PREVIEWABLE_DOCUMENT_TYPES.includes(schemaType)) {
                    return S.document().views([
                        // Default form view
                        S.view.form(),
                        // Preview
                        S.view
                            .component(Iframe)
                            .options(iframeOptions)
                            .title('Preview'),
                    ])
                }

                return null
            },
        }),
        singletonPlugin([settings.name]),
        previewUrl({
            base: PREVIEW_BASE_URL,
            requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
            urlSecretId: previewSecretId,
            matchTypes: PREVIEWABLE_DOCUMENT_TYPES,
        }),
        unsplashImageAsset(),
        visionTool({ defaultApiVersion: apiVersion }),
    ],
})
