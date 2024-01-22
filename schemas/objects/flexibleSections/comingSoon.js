import { stripHtmlFromString } from "lib/utils";

export const comingSoon = {
  name: "comingSoon",
  type: "object",
  title: "Coming Soon",
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title ? stripHtmlFromString(title) : "Coming Soon",
        subtitle: "Coming Soon",
      };
    },
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'buttons',
      type: 'array',
      title: 'Buttons',
      of: [
        {
          type: 'button',
        },
      ]
    },
    {
      name: "backgroundImage",
      type: "image",
      options: { hotspot: true },
    },
  ],
};
