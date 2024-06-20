import { stripHtmlFromString } from '@/lib/utils';
import portableText from '@/schemas/partials/portableText';
import { defineField, defineType } from 'sanity';

export const copyAndImage = defineType({
  name: 'copyAndImage',
  type: 'object',
  title: 'Copy & Image',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    portableText('copy', 'Copy'),
    portableText('subCopy', 'Sub-copy'),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'button',
      type: 'button',
    }),
    defineField({
      name: 'mobileAlignment',
      title: 'Mobile Alignment',
      type: 'string',
      // TODO enforce after migration
      // initialValue: 'imageBelow',
      options: {
        list: [
          {
            value: 'imageAbove',
            title: 'Image Above',
          },
          {
            value: 'imageBelow',
            title: 'Image Below',
          },
        ],
      },
    }),
    defineField({
      name: 'desktopAlignment',
      title: 'Desktop Alignment',
      type: 'string',
      // TODO enforce after migration
      // initialValue: 'imageRight',
      options: {
        list: [
          {
            value: 'imageLeft',
            title: 'Image Left',
          },
          {
            value: 'imageRight',
            title: 'Image Right',
          },
        ],
      },
    }),

    // #region Deprecated
    defineField({
      name: 'alignment',
      type: 'string',
      deprecated: {
        reason:
          'Use the "Mobile Alignment" or "Desktop Alignment" fields instead. This field is deprecated and will be removed in the future.',
      },
      options: {
        list: [
          {
            value: 'imageLeft',
            title: 'Image left',
          },
          {
            value: 'imageRight',
            title: 'Image right',
          },
        ],
      },
    }),
    // #endregion
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title ? stripHtmlFromString(title) : 'Untitled Copy & Image',
        subtitle: 'Copy & Image',
      };
    },
  },
});
