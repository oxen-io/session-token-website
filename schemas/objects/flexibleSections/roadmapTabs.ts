import { stripHtmlFromString } from '@/lib/utils';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const roadmapTabs = defineType({
  name: 'roadmapTabs',
  type: 'object',
  title: 'RoadmapTabs',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'tabs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Tab',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'buttonImage',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'roadmapHero',
              type: 'roadmapHero',
              title: 'RoadmapHero',
            }),
            defineField({
              name: 'roadmapSections',
              type: 'array',
              title: 'Roadmap Sections',
              of: [defineArrayMember({ type: 'roadmapSection' })],
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
