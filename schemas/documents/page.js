import { DocumentIcon, ImageIcon } from '@sanity/icons'

import flexibleSections from './flexibleSections'

const page = {
    type: 'document',
    name: 'page',
    title: 'Page',
    icon: DocumentIcon,
    fields: [
        {
            type: 'string',
            name: 'title',
            title: 'Title',
            validation: (rule) => rule.required(),
        },
        {
            type: 'slug',
            name: 'slug',
            title: 'Slug',
            options: {
                source: 'title',
            },
            validation: (rule) => rule.required(),
        },
        {
            name: 'modules',
            type: 'array',
            title: 'Page sections',
            of: flexibleSections,
        },
        {
            name: 'overview',
            description:
                'Used both for the <meta> description tag for SEO, and the personal website subheader.',
            title: 'Overview',
            type: 'array',
            of: [
                // Paragraphs
                {
                    lists: [],
                    marks: {
                        annotations: [],
                        decorators: [
                            {
                                title: 'Italic',
                                value: 'em',
                            },
                            {
                                title: 'Strong',
                                value: 'strong',
                            },
                        ],
                    },
                    styles: [],
                    type: 'block',
                },
            ],
            validation: (rule) => rule.max(155).required(),
        },
        {
            type: 'array',
            name: 'body',
            title: 'Body',
            description: "This is where you can write the page's content.",
            of: [
                // Paragraphs
                {
                    type: 'block',
                    marks: {
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'Url',
                                    },
                                ],
                            },
                        ],
                    },
                    styles: [],
                },
                // Custom blocks
                {
                    type: 'image',
                    icon: ImageIcon,
                    name: 'image',
                    title: 'Image',
                    options: {
                        hotspot: true,
                    },
                    preview: {
                        select: {
                            imageUrl: 'asset.url',
                            title: 'caption',
                        },
                    },
                    fields: [
                        {
                            title: 'Caption',
                            name: 'caption',
                            type: 'string',
                        },
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alt text',
                            description:
                                'Alternative text for screenreaders. Falls back on caption if not set',
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                subtitle: 'Page',
                title,
            }
        },
    },
}

export default page
