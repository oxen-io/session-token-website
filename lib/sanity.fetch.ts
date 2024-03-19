import { client } from '@/lib/sanity.client';
import {
  documentPaths,
  pageBySlugQuery,
  postBySlugQuery,
  settingsQuery,
} from '@/lib/sanity.queries';
import { log } from './logger';

export const maxDuration = 300;

export const token = process.env.SANITY_API_READ_TOKEN;

const DEFAULT_PARAMS = {} as Record<string, any>;
const DEFAULT_TAGS = [] as Array<string>;

export async function sanityFetch<R>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
  isServer = true,
}): Promise<R> {
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

  const sanityClient =
    client.config().useCdn && isDraftMode ? client.withConfig({ useCdn: false }) : client;

  return sanityClient.fetch<R>(query, params, {
    ...(isDraftMode && {
      cache: undefined,
      token,
      perspective: 'previewDrafts',
    }),
    next: {
      ...(isDraftMode && { revalidate: 30 }),
      tags,
    },
  });
}

export type SanitySettings = {
  rewards?: string | undefined;
  socialLinks?: Array<string> | undefined;
  menuTopLink?: string | undefined;
  mobileMenuCta?: string | undefined;
  menuItems?: string | undefined;
};

export function getSettings<R = SanitySettings>() {
  return sanityFetch<R>({
    query: settingsQuery,
    tags: ['settings', 'page', 'topic'],
  });
}

export type SanityDocument = Record<string, any>;

export function getDocumentBySlug<R = SanityDocument>(
  slug: string | Array<string>,
  type: string
): Promise<R> {
  let query: string;

  switch (type) {
    case 'page':
      query = pageBySlugQuery;
      break;
    case 'post':
      query = postBySlugQuery;
      break;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
  return sanityFetch<R>({
    query,
    params: { slug },
    tags: [`${type}:${slug}`, type],
  });
}

export type DocumentPaths = Array<{
  slug: {
    current: string;
  };
  current: string;
}>;

export function getDocumentPaths<R = DocumentPaths>(type: string): Promise<R> {
  return sanityFetch<R>({
    query: documentPaths(type),
    tags: [type],
  });
}
