import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const link = defineType({
  name: 'link',
  type: 'object',
  title: 'Link',
  icon: () => <LinkIcon />,
  fields: [
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
      validation: Rule =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'internalLink',
      type: 'reference',
      title: 'Internal Link',
      hidden: ({ parent }) => parent?.linkType !== 'internal', // hidden if link type is not internal
      to: [
        { type: 'page' },
        // other types you may want to link to
      ],
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
  ],
});

export default link;
