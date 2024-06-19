import type { SchemaFields } from '@/lib/sanity.types';
import { defineField, defineType } from 'sanity';

const fields = [
  // TODO would be nice to properly type this at some point
  defineField({
    title: 'Icon Name',
    name: 'iconName',
    type: 'string',
    options: {
      layout: 'dropdown',
      list: [
        { value: 'none', title: 'None' },
        { value: 'logo', title: 'Logo' },
        { value: 'logoWithCircle', title: 'Logo With Circle' },
        { value: 'house', title: 'House' },
      ],
    },
  }),
  defineField({
    title: 'Disabled',
    name: 'disabled',
    type: 'boolean',
  }),
  defineField({
    title: 'Is Primary',
    name: 'isPrimary',
    type: 'boolean',
  }),
  defineField({
    title: 'Link',
    name: 'link',
    type: 'link',
  }),
  defineField({
    title: 'Has arrow?',
    name: 'hasArrow',
    type: 'boolean',
  }),
];

export const button = defineType({
  title: 'Button',
  name: 'button',
  type: 'object',
  fields,
  preview: {
    select: {
      title: 'link.title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
export type ButtonSchemaType = SchemaFields<typeof fields>;
