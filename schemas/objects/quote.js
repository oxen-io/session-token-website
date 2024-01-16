import { BlockquoteIcon } from '@sanity/icons'

const quote = {
    name: 'quote',
    type: 'object',
    title: 'Quote',
    icon: BlockquoteIcon,
    fields: [
        {
            name: 'quote',
            type: 'text',
            title: 'Quote',
        },
        {
            name: 'author',
            type: 'string',
            title: 'Author',
        },
        {
            name: 'location',
            type: 'string',
            title: 'Location',
        },
    ],
    preview: {
        select: {
            title: 'quote',
            subtitle: 'author',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle,
            }
        },
    },
}

export default quote
