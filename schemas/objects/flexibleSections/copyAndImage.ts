import { stripHtmlFromString } from '@/lib/utils';
import portableText from '@/schemas/partials/portableText';
import { defineField, defineType } from 'sanity';

export const copyAndImage = defineType({
  name: 'copyAndImage',
  type: 'object',
  title: 'Copy & Image',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    portableText('copy', 'Copy'),
    portableText('subCopy', 'Sub-copy'),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'button',
      type: 'button',
    }),
    defineField({
      name: 'alignment',
      type: 'string',
      options: {
        list: [
          {
            value: 'imageLeft',
            title: 'Image left',
          },
          {
            value: 'imageRight',
            title: 'Image right',
          },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title ? stripHtmlFromString(title) : 'Untitled Copy & Image',
        subtitle: 'Copy & Image',
      };
    },
  },
});
