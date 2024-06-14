import { stripHtmlFromString } from '@/lib/utils';
import portableText from '@/schemas/partials/portableText';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const hero = defineType({
  name: 'hero',
  type: 'object',
  title: 'Hero',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    portableText('copy', 'Copy'),
    defineField({
      name: 'buttons',
      type: 'array',
      title: 'Buttons',
      of: [
        defineArrayMember({
          type: 'button',
        }),
      ],
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'backgroundSplineModel',
      type: 'object',
      title: 'Background Spline Model',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
        }),
        defineField({
          name: 'url',
          type: 'string',
          title: 'url',
        }),
      ],
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          {
            title: 'Primary',
            value: 'primary',
          },
          {
            title: 'Rewards',
            value: 'rewards',
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
        title: title ? stripHtmlFromString(title) : 'Untitled hero',
        subtitle: 'Hero',
      };
    },
  },
});
