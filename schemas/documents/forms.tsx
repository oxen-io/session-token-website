import { ComposeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const forms = defineType({
  name: 'forms',
  type: 'document',
  title: 'Forms',
  icon: () => <ComposeIcon />,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'formBuilder',
      title: 'Form Builder',
      type: 'formBuilder',
    }),
    defineField({
      name: 'buttonTitle',
      type: 'string',
    }),
    defineField({
      name: 'completionMessage',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        defineField({
          name: 'body',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'formSparkID',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});

export default forms;
