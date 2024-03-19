import { ComposeIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const formBuilder = defineType({
  name: 'formBuilder',
  title: 'Form Builder',
  icon: () => <ComposeIcon />,
  type: 'object',
  fields: [
    defineField({
      name: 'formRows',
      title: 'Form Rows',
      type: 'array',
      of: [defineArrayMember({ type: 'formRow' })],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: `Custom form setup`,
        subtitle: `Form Builder`,
      };
    },
  },
});

export default formBuilder;
