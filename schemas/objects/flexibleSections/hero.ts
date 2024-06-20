import type { SchemaFields } from '@/lib/sanity.types';
import { stripHtmlFromString } from '@/lib/utils';
import portableText from '@/schemas/partials/portableText';
import { defineArrayMember, defineField, defineType } from 'sanity';

export type HeroVariantType = 'copyImageHero' | 'copyImageStatsHero';

const heroVariantOptions = [
  {
    title: 'Copy & Image Hero',
    value: 'copyImageHero',
  },
  {
    title: 'Copy, Image & Stats Hero',
    value: 'copyImageStatsHero',
  },
];

const defaultHeroVariant = 'copyImageHero';

const heroFields = [
  defineField({
    name: 'variant',
    type: 'string',
    description:
      'The type of hero module to use on the page. Each type describes the modules inside of the hero in order. The layout is a grid system with each column being a single module.',
    title: 'Variant',
    options: {
      list: heroVariantOptions,
    },
    initialValue: defaultHeroVariant,
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'title',
    title: 'Title',
    type: 'text',
    validation: (Rule) => Rule.required(),
  }),
  portableText('copy', 'Copy'),
  defineField({
    name: 'buttons',
    type: 'array',
    title: 'Buttons',
    of: [
      defineArrayMember({
        type: 'button',
      }),
    ],
  }),
  defineField({
    name: 'image',
    title: 'Image',
    description: 'The image that will be displayed.',
    type: 'image',
    options: { hotspot: true },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'backgroundImage',
    type: 'image',
    options: { hotspot: true },
    deprecated: {
      reason:
        'Use the "Hero Image" field instead. This field is deprecated and will be removed in the future.',
    },
  }),
  defineField({
    name: 'type',
    type: 'string',
    title: 'Type',
    deprecated: {
      reason:
        'Use "Variant" field instead. This field is deprecated and will be removed in the future.',
    },
    options: {
      list: [
        {
          title: 'Primary',
          value: 'primary',
        },
        {
          title: 'Rewards',
          value: 'rewards',
        },
      ],
    },
  }),
];

export const hero = defineType({
  name: 'hero',
  type: 'object',
  title: 'Hero',
  fields: heroFields,
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title ? stripHtmlFromString(title) : 'Untitled hero',
        subtitle: 'Hero',
      };
    },
  },
});

export type HeroSchemaType = SchemaFields<typeof heroFields>;
