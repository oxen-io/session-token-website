import { stripHtmlFromString } from '@/lib/utils';
import portableText from '@/schemas/partials/portableText';
import { defineField, defineType } from 'sanity';

export const basicCopy = defineType({
  name: 'basicCopy',
  type: 'object',
  title: 'Basic Copy',
  fields: [
    portableText('copy', 'Copy'),
    defineField({
      name: 'showOutline',
      type: 'boolean',
      title: 'Show Copy Outline',
      description:
        'This will show the the "in this page" section, containing a list of headings found in the copy.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title ? stripHtmlFromString(title) : 'Untitled Basic Copy',
        subtitle: 'Basic Copy',
      };
    },
  },
});
