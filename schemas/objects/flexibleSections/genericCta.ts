import { stripHtmlFromString } from '@/lib/utils';
import portableText from '@/schemas/partials/portableText';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const genericCta = defineType({
  name: 'genericCta',
  type: 'object',
  title: 'Generic CTA',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    portableText('copy', 'Copy'),
    defineField({
      name: 'buttons',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'button',
          name: 'button',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title ? stripHtmlFromString(title) : 'Untitled Generic CTA',
        subtitle: 'Generic CTA',
      };
    },
  },
});
