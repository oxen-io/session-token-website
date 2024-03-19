import portableText from '@/schemas/partials/portableText';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const faqsList = defineType({
  name: 'faqsList',
  type: 'object',
  title: 'FAQs List',
  fields: [
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
  ],
  preview: {
    prepare() {
      return {
        title: 'FAQs List',
      };
    },
  },
});
