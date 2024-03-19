import { defineField, defineType } from 'sanity';

const portableImage = defineType({
  name: 'portableImage',
  type: 'object',
  title: 'Image',
  fields: [
    defineField({
      name: 'image',
      type: 'figure',
      title: 'Image',
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      imageUrl: 'image.asset.url',
    },
  },
});

export default portableImage;
