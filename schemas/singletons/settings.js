import { CogIcon, DocumentIcon } from '@sanity/icons'

const settings = {
    name: 'settings',
    title: 'Settings',
    type: 'document',
    icon: CogIcon,
    // Uncomment below to have edits publish automatically as you type
    // liveEdit: true,
    fields: [
        {
            name: 'title',
            description: 'This field is the title of your personal website.',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        },
        {
            name: 'menuTopLink',
            type: 'link',
        },
        {
            name: 'menuItems',
            title: 'Menu Item list',
            description: 'Links displayed on the header of your site.',
            type: 'array',
            of: [
                {
                    title: 'Page',
                    type: 'reference',
                    icon: DocumentIcon,
                    to: [
                        {
                            type: 'page',
                        },
                        {
                            type: 'navigationLink',
                        },
                    ],
                },
            ],
        },
        {
            name: 'footerMenuItems',
            title: 'Footer Menu Item list',
            description: 'Links displayed on the footer of your site.',
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
        {
            name: 'footer',
            description:
                'This is a block of text that will be displayed at the bottom of the page.',
            title: 'Footer Info',
            type: 'array',
            of: [
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
                },
            ],
        },
        {
            name: 'acknowledgement',
            title: 'Acknowledgement of Country',
            type: 'array',
            of: [
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
                },
            ],
        },
        {
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image',
            description: 'Displayed on social cards and search engine results.',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'shareModal',
            title: 'Share Modal',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                },
                {
                    name: 'copy',
                    title: 'Copy',
                    type: 'text',
                },
            ],
        },
    ],
    preview: {
        prepare() {
            return {
                title: 'Menu Items',
            }
        },
    },
}

export default settings
