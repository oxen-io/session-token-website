import { DocumentIcon, ImageIcon } from '@sanity/icons'

import portableText from "schemas/partials/portableText"
import { baseData } from 'schemas/partials/base'

const post = {
    type: 'document',
    name: 'post',
    title: 'Post',
    icon: DocumentIcon,
    fields: [
        ...baseData,
        {
            type: 'reference',
            name: 'author',
            title: 'Author',
            to: [{ type: 'author' }],
        },
        {
            type: 'image',
            icon: ImageIcon,
            name: 'featuredImage',
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
                    description: 'Alternative text for screenreaders. Falls back on caption if not set',
                },
            ],
        },
        {
            type: 'text',
            name: 'excerpt'
        },
        portableText('copy', 'Copy'),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                subtitle: 'Post',
                title,
            }
        },
    },
}

export default post
