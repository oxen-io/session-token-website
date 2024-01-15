import { stripHtmlFromString } from "@/utils"
import portableText from "../partials/portableText"

export const tileCarousel = {
    name: "tileCarousel",
    type: "object",
    title: "Tile Carousel",
    preview: {
        select: {
            title: "title",
        },
        prepare({ title }) {
            return {
                title: title ? stripHtmlFromString(title) : "Untitled Tile Carousel",
                subtitle: "Tile Carousel",
            };
        },
    },
    fields: [
        {
            name: 'title',
            type: 'string',
        },
        {
            name: 'content',
            description: `If you put content in here, we'll use the smaller layout (e.g for Roadmap section)`,
            type: 'object',
            fields: [
                {
                    name: 'title',
                    type: 'string'
                },
                portableText('copy', 'Copy'),
            ]
        },
        {
            name: 'tiles',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Tile',
                    fields: [
                        {
                            name: 'preTitle',
                            type: 'string'
                        },
                        {
                            name: 'title',
                            type: 'string',
                        },
                        {
                            name: 'copy',
                            type: 'text',
                        },
                        {
                            name: 'link',
                            type: 'string',
                        },
                        {
                            name: 'linkLabel',
                            type: 'string'
                        },
                        {
                            name: 'image',
                            type: 'image',
                            options: {
                                hotspot: true
                            }
                        }, {
                            name: 'fullSizeImage',
                            title: 'Full-size image?',
                            type: 'boolean'
                        }
                    ]
                }
            ]
        }
    ],
};
