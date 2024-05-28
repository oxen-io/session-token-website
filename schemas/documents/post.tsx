import { DocumentIcon, ImageIcon } from '@sanity/icons';

import type { DocumentFields, SchemaFields } from '@/lib/sanity.types';
import { baseData } from '@/schemas/partials/base';
import portableText from '@/schemas/partials/portableText';
import { defineField, defineType } from 'sanity';

const fields = [
  ...baseData,
  defineField({
    type: 'date',
    name: 'datePosted',
  }),
  defineField({
    type: 'reference',
    name: 'author',
    title: 'Author',
    to: [{ type: 'author' }],
  }),
  defineField({
    type: 'image',
    icon: () => <ImageIcon />,
    name: 'featuredImage',
    options: {
      hotspot: true,
    },
    preview: {
      select: {
        imageUrl: 'asset.url',
        title: 'caption',
      },
    },
    fields: [
      defineField({
        title: 'Caption',
        name: 'caption',
        type: 'string',
      }),
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Alt text',
        description: 'Alternative text for screenreaders. Falls back on caption if not set',
      }),
    ],
  }),
  defineField({
    type: 'text',
    name: 'excerpt',
  }),
  portableText('copy', 'Copy'),
];

const post = defineType({
  type: 'document',
  name: 'post',
  title: 'Post',
  icon: () => <DocumentIcon />,
  fields,
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Post',
        title,
      };
    },
  },
});

export default post;

export type PostSchemaType = SchemaFields<typeof fields> & DocumentFields;
