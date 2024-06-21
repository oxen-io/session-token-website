import type { SchemaFields } from '@/lib/sanity.types';
import portableText from '@/schemas/partials/portableText';
import { baseStyles } from '@/schemas/partials/styling';
import { defineArrayMember, defineField, defineType } from 'sanity';

const faqFields = [
  ...baseStyles,
  defineField({
    name: 'categories',
    type: 'array',
    of: [
      defineArrayMember({
        name: 'category',
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            type: 'string',
          }),
          defineField({
            name: 'faqs',
            type: 'array',
            of: [
              defineArrayMember({
                name: 'faq',
                type: 'object',
                fields: [
                  defineField({
                    name: 'question',
                    type: 'string',
                  }),
                  portableText('answer', 'Answer'),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }),
  defineField({
    name: 'hideCategoryTitles',
    type: 'boolean',
    title: 'Hide Category Titles',
  }),
  defineField({
    name: 'hideTableOfContents',
    type: 'boolean',
    title: 'Hide Table of Contents',
  }),
];

export const faqsList = defineType({
  name: 'faqsList',
  type: 'object',
  title: 'FAQs List',
  fields: faqFields,
  preview: {
    prepare() {
      return {
        title: 'FAQs List',
      };
    },
  },
});

export type FAQSchemaType = SchemaFields<typeof faqFields>;
