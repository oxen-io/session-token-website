import portableText from "schemas/partials/portableText";
import { stripHtmlFromString } from "lib/utils";


export const joinCta = {
    name: "joinCta",
    type: "object",
    title: "Join CTA",
    preview: {
        select: {
            title: "title",
        },
        prepare({ title }) {
            return {
                title: title ? stripHtmlFromString(title) : "Untitled Join CTA",
                subtitle: "Join CTA",
            };
        },
    },
    fields: [
        {
            name: 'preTitle',
            type: 'string',
        },
        {
            name: 'title',
            type: 'string',
        },
        portableText('copy', 'Copy'),
        {
            name: 'image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'socialLinks',
            type: 'socialLinks',
        }
    ],
};
