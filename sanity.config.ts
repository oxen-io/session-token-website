import { apiVersion, dataset, previewSecretId, projectId } from '@/lib/sanity.api';
import { pageStructure, singletonPlugin } from '@/plugins/settings';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import Iframe, { defineUrlResolver } from 'sanity-plugin-iframe-pane';
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url';
import { deskTool } from 'sanity/desk';

import page from '@/schemas/documents/page';
import settings from '@/schemas/singletons/settings';

import post from '@/schemas/documents/post';
import schema from '@/schemas/schema';

export const PREVIEWABLE_DOCUMENT_TYPES = [page.name, post.name];
type PreviewableDocumentType = (typeof PREVIEWABLE_DOCUMENT_TYPES)[number];

export const PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS = [page.name, post.name];

// Used to generate URLs for drafts and live previews
export const PREVIEW_BASE_URL = '/api/draft';

export const urlResolver = defineUrlResolver({
  base: '/api/draft',
  requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
});

export const iframeOptions = {
  url: urlResolver,
  urlSecretId: previewSecretId,
};

const config = defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  title: 'Session Token',
  schema: {
    types: schema,
  },
  plugins: [
    deskTool({
      structure: pageStructure([settings]),
      defaultDocumentNode: (S, { schemaType }) => {
        if (PREVIEWABLE_DOCUMENT_TYPES.includes(schemaType as PreviewableDocumentType)) {
          return S.document().views([
            // Default form view
            S.view.form(),
            // Preview
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ]);
        }

        return null;
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
});

export default config;
