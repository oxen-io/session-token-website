import type { SchemaFields } from '@/lib/sanity.types';
import { defineField } from 'sanity';

export type MaxWidthType = 'full' | 'medium';

const maxWithOptions = [
  { title: 'Full', value: 'full' },
  { title: 'Medium', value: 'medium' },
] satisfies Array<{ title: string; value: MaxWidthType }>;

const defaultMaxWidth = 'full';
export const baseStyles = [
  defineField({
    name: 'maxWidth',
    type: 'string',
    title: 'Maximum width',
    description: 'Set the maximum width of the element. Medium will center the content.',
    options: {
      list: maxWithOptions,
      layout: 'radio',
    },
    initialValue: defaultMaxWidth,
    validation: (Rule) => Rule.required(),
  }),
];
export type BaseSchemaType = SchemaFields<typeof baseStyles>;
