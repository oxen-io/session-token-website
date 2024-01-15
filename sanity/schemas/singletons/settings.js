import { CogIcon, DocumentIcon } from "@sanity/icons"

const settings = {
    name: "settings",
    title: "Settings",
    type: "document",
    icon: CogIcon,
    preview: {
            prepare() {
                return {
                    title: "Settings",
                };
            },
    },
    fields: [
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
    ],
};

export default settings
