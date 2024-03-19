import { stripHtmlFromString } from '@/lib/utils';
import portableText from '@/schemas/partials/portableText';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const tileCarousel = defineType({
  name: 'tileCarousel',
  type: 'object',
  title: 'Tile Carousel',
  fields: [
    defineField({
      name: 'title',
      type: 'text',
    }),
    defineField({
      name: 'borderless',
      title: 'Borderless?',
      description: `Removes borders around tiles, and centres content`,
      type: 'boolean',
    }),
    defineField({
      name: 'content',
      description: `If you put content in here, we'll use the smaller layout (e.g for Roadmap section)`,
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        portableText('copy', 'Copy'),
      ],
    }),
    defineField({
      name: 'tiles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Tile',
          fields: [
            defineField({
              name: 'preTitle',
              type: 'string',
            }),
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'copy',
              type: 'text',
            }),
            defineField({
              name: 'link',
              type: 'string',
            }),
            defineField({
              name: 'linkLabel',
              type: 'string',
            }),
            defineField({
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'fullSizeImage',
              title: 'Full-size image?',
              type: 'boolean',
            }),
          ],
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
        title: title ? stripHtmlFromString(title) : 'Untitled Tile Carousel',
        subtitle: 'Tile Carousel',
      };
    },
  },
});
