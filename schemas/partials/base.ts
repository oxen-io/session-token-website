import { defineField } from 'sanity';

export const baseData = [
  defineField({
    name: 'title',
    type: 'string',
    title: 'Title',
    validation: Rule => Rule.required(),
  }),
  defineField({
    name: 'slug',
    type: 'slug',
    title: 'Slug',
    options: {
      source: 'title',
    },
    validation: Rule => Rule.required(),
  }),
  defineField({
    name: 'metadata',
    title: 'Metadata',
    type: 'object',
    fields: [
      defineField({
        name: 'title',
        title: 'Title (Optional)',
        type: 'string',
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'ogpImage',
        title: 'OGP image',
        type: 'image',
      }),
    ],
  }),
];
