'server-only';

import { sanityClient } from '@/lib/sanity.client';
import { CMSDocument, SPECIAL_SELECT, sanityQuery } from '@/lib/sanity.queries';
import type { FilteredResponseQueryOptions, QueryParams } from '@sanity/client';
import { log } from './logger';

export const maxDuration = 300;

export const token = process.env.SANITY_API_READ_TOKEN;

const defaultParams = {} as QueryParams;

export async function sanityFetch<QueryResponse>({
  query,
  tags,
  params = defaultParams,
  isServer = true,
}: {
  query: string;
  tags: Array<CMSDocument | string>;
  params?: QueryParams;
  isServer?: boolean;
}): Promise<QueryResponse> {
  let isDraftMode = false;

  if (isServer) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
      const { draftMode } = require('next/headers');

      isDraftMode = draftMode().isEnabled;
    } catch (e) {
      log.error(`Error getting draft mode`, e);
      log.error(query);
    }
  }

  if (isDraftMode && !token) {
    throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required.');
  }

  const queryOptions: FilteredResponseQueryOptions = {
    cache: 'force-cache',
    next: { tags },
  };

  const draftQueryOptions: FilteredResponseQueryOptions = {
    cache: undefined,
    token,
    perspective: 'previewDrafts',
    next: { revalidate: 30, tags },
  };

  return sanityClient.fetch<QueryResponse>(
    query,
    params,
    isDraftMode ? draftQueryOptions : queryOptions
  );
}

export type SettingsSchemaType = {
  rewards?: string | undefined;
  socialLinks?: Array<string> | undefined;
  menuTopLink?: string | undefined;
  mobileMenuCta?: string | undefined;
  menuItems?: string | undefined;
};

export const getSettings = () => {
  return sanityQuery
    .from(CMSDocument.Settings)
    .select([SPECIAL_SELECT[CMSDocument.Settings]])
    .executeSingle();
};

export type DocumentPaths = Array<{
  slug: {
    current: string;
  };
  current: string;
}>;

export async function getDocumentData<D extends CMSDocument>(
  document: D,
  slug: string | Array<string>
) {
  log.debug(`Getting page data for slug: ${slug}`);
  const [settings, page] = await Promise.all([
    getSettings(),
    sanityQuery.from(document).select().eq('slug.current', slug.toString()).executeSingle(),
  ]);

  if (!page) {
    log.error(`No page found for slug: ${slug}`);
  }

  log.debug(`Page data for slug ${slug} - Page:`, page);
  log.debug(`Page data for slug ${slug} - Settings:`, settings);

  return { settings, page };
}
