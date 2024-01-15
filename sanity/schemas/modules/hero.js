import { stripHtmlFromString } from "@/utils"
import portableText from "../partials/portableText"

export const heroType = {
  name: "hero",
  type: "object",
  title: "Hero",
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title ? stripHtmlFromString(title) : "Untitled hero",
        subtitle: "Hero",
      };
    },
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    portableText("copy", "Copy"),
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
    {
      name: "type",
      type: "string",
      title: "Type",
      options: {
        list: [
          {
            title: "Primary", value: 'primary'
          }, {
            title: "Rewards", value: 'rewards'
          }
        ]
      }
    }
  ],
};
