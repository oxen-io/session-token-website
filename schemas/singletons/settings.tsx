/* eslint-disable react/display-name */
import type { DocumentFields, SchemaFields } from '@/lib/sanity.types';
import { CogIcon, DocumentIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const shareModalFields = [
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
  }),
  defineField({
    name: 'copy',
    title: 'Copy',
    type: 'text',
  }),
];

export type ShareModalSchemaType = SchemaFields<typeof shareModalFields>;

const fields = [
  defineField({
    name: 'title',
    description: 'This field is the title of your personal website.',
    title: 'Title',
    type: 'string',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'menuTopLink',
    title: 'Primary CTA',
    type: 'button',
  }),
  defineField({
    name: 'footerCTA',
    title: 'Footer CTA',
    type: 'button',
  }),
  defineField({
    name: 'footerMangedBy',
    title: 'Footer Manged By Information',
    type: 'string',
  }),
  defineField({
    name: 'footerCopyright',
    title: 'Footer Copyright Information',
    description:
      'Displayed in the fotter, will append "All rights reserved". If nothing is provided no text will display.',
    type: 'string',
  }),
  defineField({
    name: 'mobileMenuCta',
    type: 'button',
  }),
  defineField({
    name: 'lastUpdatedDate',
    type: 'string',
  }),
  defineField({
    name: 'menuItems',
    title: 'Menu Item list',
    description: 'Links displayed on the header of your site.',
    type: 'array',
    of: [
      defineArrayMember({
        title: 'Page',
        type: 'reference',
        icon: <DocumentIcon />,
        to: [
          {
            type: 'page',
          },
          {
            type: 'navigationLink',
          },
        ],
      }),
    ],
  }),
  defineField({
    name: 'ogImage',
    title: 'Default OpenGraph Image',
    type: 'image',
    description: 'Displayed on social cards and search engine results.',
    options: {
      hotspot: true,
    },
  }),
  defineField({
    name: 'shareModal',
    title: 'Share Modal',
    type: 'object',
    fields: shareModalFields,
  }),
  defineField({
    name: 'socialLinks',
    type: 'socialLinks',
  }),
  defineField({
    name: 'rewards',
    type: 'object',
    fields: [
      defineField({
        name: 'timeUntilNextRewardPercent',
        type: 'number',
      }),
      defineField({
        name: 'meta',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              defineField({
                name: 'title',
                type: 'string',
              }),
              defineField({
                name: 'copy',
                type: 'string',
              }),
            ],
          }),
        ],
      }),
    ],
  }),
];

const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: () => <CogIcon />,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields,
  preview: {
    prepare() {
      return {
        title: 'Settings',
      };
    },
  },
});

export default settings;
export type SettingsSchemaType = SchemaFields<typeof fields> & DocumentFields;
