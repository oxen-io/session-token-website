import type { DocumentFields, SchemaFields } from '@/lib/sanity.types';
import { baseData } from '@/schemas/partials/base';
import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import flexibleSections from './flexibleSections';

const fields = [
  ...baseData,
  defineField({
    name: 'modules',
    type: 'array',
    title: 'Page sections',
    of: flexibleSections,
  }),
  defineField({
    name: 'production',
    type: 'boolean',
    title: 'Make Visible in Production',
    description:
      'This will make the page visible on the website. If this is not checked, the page will not be visible on the website and will only be visible in the CMS or when the website is running in a staging or development environment.',
  }),
];

const page = defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: () => <DocumentIcon />,
  fields,
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Page',
        title,
      };
    },
  },
});

export default page;
export type Page = SchemaFields<typeof fields> & DocumentFields;
