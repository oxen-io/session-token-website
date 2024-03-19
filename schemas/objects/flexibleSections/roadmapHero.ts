import { stripHtmlFromString } from '@/lib/utils';
import portableText from '@/schemas/partials/portableText';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const roadmapHero = defineType({
  name: 'roadmapHero',
  type: 'object',
  title: 'RoadmapHero',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    portableText('copy', 'Copy'),
    defineField({
      name: 'buttonTitle',
      title: 'Button Title',
      type: 'text',
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
      name: 'replaceImageWithHyperglobe',
      type: 'boolean',
      title: 'Replace image with Hyperglobe',
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
