export const baseData = [
  {
    name: "title",
    type: "string",
    label: "Title",
    validation: (Rule) => Rule.required(),
  },
  {
    name: "slug",
    type: "slug",
    label: "Slug",
    options: {
      source: 'title',
    },
    validation: (Rule) => Rule.required(),
  },
  {
    name: "metadata",
    title: "Metadata",
    type: "object",
    fields: [
      {
        name: "title",
        title: "Title (Optional)",
        type: "string",
      },
      {
        name: "description",
        title: "Description",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
    ],
  },
];
