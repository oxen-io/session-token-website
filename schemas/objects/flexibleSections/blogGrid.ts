import { defineField, defineType } from 'sanity';

export const blogGrid = defineType({
  name: 'blogGrid',
  type: 'object',
  title: 'Blog grid',
  fields: [
    defineField({
      name: 'morePostsTitle',
      title: `"More posts" title`,
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: `Blog grid`,
        subtitle: '',
      };
    },
  },
});
