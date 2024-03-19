import { stripHtmlFromString } from '@/lib/utils';
import portableText from '@/schemas/partials/portableText';
import { defineField, defineType } from 'sanity';

export const joinCta = defineType({
  name: 'joinCta',
  type: 'object',
  title: 'Join CTA',
  fields: [
    defineField({
      name: 'preTitle',
      type: 'string',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    portableText('copy', 'Copy'),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socialLinks',
      type: 'socialLinks',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title ? stripHtmlFromString(title) : 'Untitled Join CTA',
        subtitle: 'Join CTA',
      };
    },
  },
});
