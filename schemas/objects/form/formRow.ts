import { defineArrayMember, defineField, defineType } from 'sanity';

const formRow = defineType({
  title: 'Form Row',
  name: 'formRow',
  type: 'object',
  fields: [
    defineField({
      name: 'rowTitle',
      title: 'Row Title',
      type: 'string',
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [defineArrayMember({ type: 'formFields' })],
      validation: (Rule) => Rule.min(1).max(2),
    }),
  ],
  preview: {
    select: {
      title: 'rowTitle',
    },
    prepare({ title }) {
      return {
        title: `Form Row - ${title || 'untitled'}`,
      };
    },
  },
});

export default formRow;
