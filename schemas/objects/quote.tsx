import { BlockquoteIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const quote = defineType({
  name: 'quote',
  type: 'object',
  title: 'Quote',
  icon: () => <BlockquoteIcon />,
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Author',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
    }),
  ],
  preview: {
    select: {
      title: 'quote',
      subtitle: 'author',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
});

export default quote;
