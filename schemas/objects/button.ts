import { defineField, defineType } from 'sanity';

export const button = defineType({
  title: 'Button',
  name: 'button',
  type: 'object',
  fields: [
    defineField({
      title: 'Icon Name',
      name: 'iconName',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: [
          { value: 'none', title: 'None' },
          { value: 'logo', title: 'Logo' },
          { value: 'logoWithCircle', title: 'Logo With Circle' },
        ],
      },
    }),
    defineField({
      title: 'Has arrow?',
      name: 'hasArrow',
      type: 'boolean',
    }),
    defineField({
      title: 'Is Primary',
      name: 'isPrimary',
      type: 'boolean',
    }),
    defineField({
      title: 'Link',
      name: 'link',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      title: 'link.title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
