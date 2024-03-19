import { defineArrayMember, defineField, defineType } from 'sanity';

export const iconStrip = defineType({
  name: 'iconStrip',
  type: 'object',
  title: 'Icon Strip',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'icons',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'icon',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: `Icon Strip`,
        subtitle: '',
      };
    },
  },
});
