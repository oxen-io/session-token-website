import { LinkIcon } from '@sanity/icons'

const navigationLink = {
    name: 'navigationLink',
    type: 'document',
    title: 'Navigation Link',
    icon: LinkIcon,
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
        },
        {
            name: 'page',
            type: 'reference',
            description: 'Select the page that this link should point to',
            to: [
                {
                    type: 'page',
                },
            ],
        },
        {
            name: 'children',
            type: 'array',
            of: [
                {
                    title: 'Reference',
                    type: 'reference',
                    to: [
                        {
                            type: 'page',
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: {
            pageTitle: 'page.title',
            title: 'title',
        },
        prepare({ pageTitle, title }) {
            return {
                title,
                subtitle: pageTitle
                    ? `Page: ${pageTitle}`
                    : `No page associated`,
            }
        },
    },
}

export default navigationLink
