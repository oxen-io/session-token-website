import { defineField, defineType } from 'sanity';

const formFields = defineType({
  name: 'formFields',
  title: 'Form Fields',
  type: 'object',
  fields: [
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'fieldName',
      title: 'Field Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
    }),
    defineField({
      name: 'fieldId',
      title: 'Field ID',
      type: 'slug',
      options: {
        source: (doc, options) => {
          if (!options.parent) {
            throw new Error('Parent is missing');
          } else if (
            !('fieldName' in options.parent) ||
            typeof options.parent.fieldName !== 'string'
          ) {
            throw new Error('Parent fieldName is missing');
          }

          return options.parent.fieldName;
        },
        maxLength: 200,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'inputType',
      title: 'Input Type',
      type: 'string',
      initialValue: 'text',
      options: {
        layout: 'dropdown',
        list: [
          { value: 'text', title: 'Text input' },
          { value: 'email', title: 'Email' },
          { value: 'phone', title: 'Phone number' },
          { value: 'textArea', title: 'Text area' },
          { value: 'file', title: 'File upload' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
  ],
});

export default formFields;
