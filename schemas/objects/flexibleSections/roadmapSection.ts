import { stripHtmlFromString } from '@/lib/utils';
import portableText from '@/schemas/partials/portableText';
import { defineField, defineType } from 'sanity';

export const roadmapSection = defineType({
  name: 'roadmapSection',
  type: 'object',
  title: 'Roadmap Section',
  fields: [
    defineField({
      name: 'segment',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
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
      options: { hotspot: true },
    }),
    defineField({
      name: 'showLink',
      type: 'boolean',
      title: 'Show Link',
    }),
    defineField({
      name: 'link',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title ? stripHtmlFromString(title) : 'Untitled Roadmap Section',
        subtitle: 'Roadmap Section',
      };
    },
  },
});
