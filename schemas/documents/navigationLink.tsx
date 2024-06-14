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
      title: 'Select the type of link',
      description:
        'External links go to other websites using the format `https://www.google.com`. Internal links are restricted to other pages in the SANITY database.',
      name: 'linkType',
      type: 'string',
      options: {
        list: [
          { title: 'External', value: 'external' },
          { title: 'Internal', value: 'internal' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      title: 'URL',
      name: 'href',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external', // hidden if link type is not external
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      hidden: ({ parent }) => parent?.linkType !== 'internal', // hidden if link type is not internal
    }),
    defineField({
      name: 'page',
      type: 'reference',
      hidden: ({ parent }) => parent?.linkType !== 'internal', // hidden if link type is not internal
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
