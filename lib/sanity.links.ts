import type { LinkSchemaType } from '@/schemas/objects/link';
import { log } from './logger';

export function resolveHref(documentType, slug) {
  switch (documentType) {
    case 'page':
      return slug ? `/${slug}` : undefined;
    case 'post':
      return slug ? `/blog/${slug}` : undefined;
    default:
      log.error('Invalid document type:', documentType, 'slug', slug);
      return undefined;
  }
}

export const resolveLinkFromSanityOrString = (link: LinkSchemaType | string) => {
  if (!link) {
    return undefined;
  }

  if (typeof link === 'string') {
    return link;
  }

  const { internalLink, linkType, href } = link;

  if (linkType === 'internal' && internalLink) {
    return resolveHref(internalLink._type, internalLink.slug);
  }

  if (linkType === 'external') {
    return href;
  }

  return undefined;
};

export function isLocalLink(link: string) {
  return Boolean(
    link && !link.includes('http') && !link.includes('mailto:') && !link.includes('tel:')
  );
}

export const createSanityLink = (link: string, title?: string): LinkSchemaType => ({
  title: title || link,
  linkType: isLocalLink(link) ? 'internal' : 'external',
  href: link,
  internalLink: resolveLinkFromSanityOrString(link),
});
