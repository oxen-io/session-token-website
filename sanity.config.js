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
import navigationLink from 'schemas/documents/navigationLink'
import settings from 'schemas/singletons/settings'
import forms from 'schemas/documents/forms'

import { hero } from 'schemas/objects/flexibleSections/hero'
import { joinCta } from 'schemas/objects/flexibleSections/joinCta'
import { statsTiles } from 'schemas/objects/flexibleSections/statsTiles'
import { tileCarousel } from 'schemas/objects/flexibleSections/tileCarousel' 
import { iconStrip } from 'schemas/objects/flexibleSections/iconStrip'
import { copyAndImage } from 'schemas/objects/flexibleSections/copyAndImage'
import { button } from 'schemas/objects/button'

import link from 'schemas/objects/link'
import figure from 'schemas/objects/figure'
import formRow from 'schemas/objects/form/formRow'
import formBuilder from 'schemas/objects/form/formBuilder'
import formFields from 'schemas/objects/form/formFields'
import quote from 'schemas/objects/quote'
import portableImage from 'schemas/objects/portableImage'

const title =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
    'YC Next.js + Sanity Starter'

export const PREVIEWABLE_DOCUMENT_TYPES = [
    page.name,
]

export const PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS = [
    page.name,
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
        types: [
            // Singletons
            settings,
            // Documents
            page,
            navigationLink,
            forms,
            // Objects
            hero,
            joinCta,
            statsTiles,
            tileCarousel,
            iconStrip,
            copyAndImage,
            figure,
            link,
            formFields,
            formRow,
            formBuilder,
            quote,
            portableImage,
            button,
        ],

    },
    plugins: [
        deskTool({
            structure: pageStructure([settings]),
            // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
            // You can add any React component to `S.view.component` and it will be rendered in the pane
            // and have access to content in the form in real-time.
            // It's part of the Studio's “Structure Builder API” and is documented here:
            // https://www.sanity.io/docs/structure-builder-reference
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
        // Configures the global "new document" button, and document actions, to suit the Settings document singleton
        singletonPlugin([settings.name]),
        // Add the "Open preview" action
        previewUrl({
            base: PREVIEW_BASE_URL,
            requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
            urlSecretId: previewSecretId,
            matchTypes: PREVIEWABLE_DOCUMENT_TYPES,
        }),
        // Add an image asset source for Unsplash
        unsplashImageAsset(),
        // Vision lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
    ],
})
