import { stripHtmlFromString } from '@/lib/utils';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const comingSoon = defineType({
  name: 'comingSoon',
  type: 'object',
  title: 'Coming Soon',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
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
      name: 'backgroundAlt',
      type: 'string',
      title: 'Background Image Alternative Text',
      validation: (rule) => rule.required().error(`Images require alternative text`),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title ? stripHtmlFromString(title) : 'Coming Soon',
        subtitle: 'Coming Soon',
      };
    },
  },
});
