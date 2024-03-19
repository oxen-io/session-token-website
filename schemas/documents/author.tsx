import { UserIcon } from '@sanity/icons';

import { baseData } from '@/schemas/partials/base';
import { defineType } from 'sanity';

const author = defineType({
  type: 'document',
  name: 'author',
  title: 'Authors',
  icon: () => <UserIcon />,
  fields: [...baseData],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Author',
        title,
      };
    },
  },
});

export default author;
