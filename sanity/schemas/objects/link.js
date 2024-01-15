export const link = {
    name: 'link',
    title: "Link",
    type: "object",
    fields: [
        {
            name: "label",
            type: "string",
            title: "Label",
        },
        {
            title: 'Select the type of link',
            description: 'External links go to other websites using the format `https://www.google.com`. Internal links are restricted to other pages in the SANITY database.',
            name: 'linkType',
            type: 'string',
            options: {
                list: [
                    { title: 'External', value: 'external' },
                    { title: 'Internal', value: 'internal' },
                ],
                layout: 'radio',
            },
        },
        {
            title: 'URL',
            name: 'href',
            type: 'url',
            hidden: ({ parent }) => parent?.linkType !== 'external', // hidden if link type is not external
            validation: (Rule) =>
                Rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http', 'mailto', 'tel'],
                }),
        },
        {
            name: 'internalLink',
            type: 'reference',
            title: 'Internal Link',
            hidden: ({ parent }) => parent?.linkType !== 'internal', // hidden if link type is not internal
            to: [
                { type: 'page' },
                // other types you may want to link to
            ],
        },
    ]
};
