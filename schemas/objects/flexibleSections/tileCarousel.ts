import type { SchemaFields } from '@/lib/sanity.types';
import { stripHtmlFromString } from '@/lib/utils';
import portableText from '@/schemas/partials/portableText';
import { defineArrayMember, defineField, defineType } from 'sanity';

const contentFields = [
  defineField({
    name: 'title',
    type: 'string',
  }),
  portableText('copy', 'Copy'),
];
export type CarouselContentSchemaType = SchemaFields<typeof contentFields> & {
  copy: typeof portableText;
};

const tileFields = [
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
];
export type TileSchemaType = SchemaFields<typeof tileFields>;

const fields = [
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
    fields: contentFields,
  }),
  defineField({
    name: 'tiles',
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        title: 'Tile',
        fields: tileFields,
      }),
    ],
  }),
];

export const tileCarousel = defineType({
  name: 'tileCarousel',
  type: 'object',
  title: 'Tile Carousel',
  fields,
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
export type TileCarouselSchemaType = SchemaFields<typeof fields>;
