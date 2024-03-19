import { LinkIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const navigationLink = defineType({
  name: 'navigationLink',
  type: 'document',
  title: 'Navigation Link',
  icon: () => <LinkIcon />,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
    }),
    defineField({
      name: 'page',
      type: 'reference',
      description: 'Select the page that this link should point to',
      to: [
        {
          type: 'page',
        },
      ],
    }),
    defineField({
      name: 'children',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Reference',
          type: 'reference',
          to: [
            {
              type: 'page',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      pageTitle: 'page.title',
      title: 'title',
    },
    prepare({ pageTitle, title }) {
      return {
        title,
        subtitle: pageTitle ? `Page: ${pageTitle}` : `No page associated`,
      };
    },
  },
});

export default navigationLink;
