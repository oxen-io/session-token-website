import portableText from "schemas/partials/portableText";
import { stripHtmlFromString } from "lib/utils";


export const genericCta = {
    name: "genericCta",
    type: "object",
    title: "Generic CTA",
    preview: {
        select: {
            title: "title",
        },
        prepare({ title }) {
            return {
                title: title ? stripHtmlFromString(title) : "Untitled Generic CTA",
                subtitle: "Generic CTA",
            };
        },
    },
    fields: [
        {
            name: 'title',
            type: 'string',
        },
        portableText('copy', 'Copy'),
        {
            name: 'buttons',
            type: 'array',
            of: [
                {
                    type: 'button',
                    name: 'button'
                }
            ]
        }
    ],
};
