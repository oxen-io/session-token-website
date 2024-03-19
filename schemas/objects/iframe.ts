import { defineField, defineType } from 'sanity';

export const iframe = defineType({
  name: 'iframe',
  title: 'iFrame embed',
  type: 'object',
  fields: [
    defineField({
      name: 'embedCode',
      type: 'text',
      title: 'Embed code',
    }),
  ],
});
