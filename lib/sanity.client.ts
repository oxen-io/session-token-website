import { apiVersion, dataset, projectId } from '@/lib/sanity.api';

import { createClient } from 'next-sanity';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
});
