'server-only';

import { apiVersion, dataset, projectId } from '@/lib/sanity.api';
import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
};

export const sanityClient = createClient(config);
