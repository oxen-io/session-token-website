import { stripHtmlFromString } from "@/utils"
import portableText from "../partials/portableText"

export const joinCtaType = {
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
            name: 'links',
            type: 'array',
            of: [
                {
                    name: 'link',
                    type: 'object',
                    fields: [
                        {
                            name: 'icon',
                            type: 'image'
                        }, {
                            name: 'url',
                            type: 'string'
                        }
                    ]
                }
            ]
        }
    ],
};
