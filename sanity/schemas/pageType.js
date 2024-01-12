import { baseData } from "./partials/base"

const loopModules = names => {
  return names.map(name => ({
    name,
    type: name
  }))
}

export const pageType = {
  name: "page",
  type: "document",
  title: "Page",
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Untitled Page",
        subtitle: "Page",
      };
    },
  },
  fields: [
    ...baseData,
    {
      name: "modules",
      type: "array",
      title: "Modules",
      of: loopModules([
        'copyAndImage',
        'hero',
        'iconStrip',
        'joinCta',
        'statsTiles',
        'tileCarousel'
      ]),
    },
  ],
};
