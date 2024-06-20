import { defineField, defineType } from 'sanity';

export const postGrid = defineType({
  name: 'postGrid',
  type: 'object',
  title: 'Post grid',
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
        title: `Post grid`,
        subtitle: '',
      };
    },
  },
});
