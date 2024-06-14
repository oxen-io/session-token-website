import type { SchemaFields } from '@/lib/sanity.types';
import { defineArrayMember, defineField, defineType } from 'sanity';

const fields = [
  defineField({
    name: 'company',
    title: 'Company',
    type: 'string',
    options: {
      list: [
        { title: 'X', value: 'x' },
        { title: 'GitHub', value: 'github' },
        { title: 'YouTube', value: 'youtube' },
        { title: 'Reddit', value: 'reddit' },
        { title: 'Instagram', value: 'instagram' },
        { title: 'LinkedIn', value: 'linkedin' },
        { title: 'Vimeo', value: 'vimeo' },
        { title: 'WhatsApp', value: 'whatsapp' },
        { title: 'Facebook', value: 'facebook' },
        { title: 'Telegram', value: 'telegram' },
        { title: 'Session', value: 'session' },
        { title: 'RSS', value: 'rss' },
        { title: 'Discord', value: 'discord' },
      ],
    },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'link',
    title: 'Link',
    type: 'url',
  }),
];
export type SocialLinksSchemaType = SchemaFields<typeof fields>;

const socialLinks = defineType({
  name: 'socialLinks',
  title: 'Social Links',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'object',
      title: 'Link',
      fields,
    }),
  ],
});

export default socialLinks;
