import { defineField, defineType } from 'sanity';

const splineModel = defineType({
  name: 'splineModel',
  title: 'Spline Model',
  type: 'object',
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
    }),
    defineField({
      name: 'url',
      type: 'string',
      title: 'url',
    }),
  ],
});

export default splineModel;
