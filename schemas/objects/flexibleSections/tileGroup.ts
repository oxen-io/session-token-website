import type { SchemaFields } from '@/lib/sanity.types';
import { stripHtmlFromString } from '@/lib/utils';
import { defineArrayMember, defineField, defineType } from 'sanity';

const tileFields = [
  defineField({
    name: 'title',
    type: 'string',
  }),
  defineField({
    name: 'copy',
    type: 'text',
  }),
  defineField({
    name: 'image',
    type: 'image',
    options: {
      hotspot: true,
    },
  }),
];
export type TileSchemaType = SchemaFields<typeof tileFields>;

const fields = [
  defineField({
    name: 'title',
    type: 'text',
  }),
  defineField({
    name: 'showPrimaryBackground',
    title: 'Show Primary Colour Background',
    type: 'boolean',
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

export const tileGroup = defineType({
  name: 'tileGroup',
  type: 'object',
  title: 'Tile Group',
  fields,
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title ? stripHtmlFromString(title) : 'Untitled Tile Group',
        subtitle: 'Tile Group',
      };
    },
  },
});
export type TileGroupSchemaType = SchemaFields<typeof fields>;
