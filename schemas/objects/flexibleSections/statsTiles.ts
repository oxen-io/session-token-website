import { defineArrayMember, defineField, defineType } from 'sanity';

export const statsTiles = defineType({
  name: 'statsTiles',
  type: 'object',
  title: 'Stats Tiles',
  fields: [
    defineField({
      name: 'tiles',
      type: 'array',
      title: 'Tiles',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tile',
          title: 'Tile',
          fields: [
            defineField({
              name: 'figure',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'copy',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'backgroundImage',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: `Stats Tiles`,
        subtitle: '',
      };
    },
  },
});
