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
            type: 'button',
        },
        {
            name: 'mobileMenuCta',
            type: 'button'
        },
        {
            name: 'lastUpdatedDate',
            type: 'string'
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
            name: 'ogImage',
            title: 'Default OpenGraph Image',
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
        {
            name: 'socialLinks',
            type: 'socialLinks'
        }, {
            name: 'rewards',
            type: 'object',
            fields: [
                {
                    name: 'timeUntilNextRewardPercent',
                    type: 'number'
                }, {
                    name: 'meta',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'title',
                                    type: 'string'
                                }, {
                                    name: 'copy',
                                    type: 'string'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    preview: {
        prepare() {
            return {
                title: 'Settings',
            }
        },
    },
}

export default settings
