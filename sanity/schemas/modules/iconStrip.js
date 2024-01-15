export const iconStrip = {
    name: "iconStrip",
    type: "object",
    title: "Icon Strip",
    preview: {
        prepare() {
            return {
                title: `Icon Strip`,
                subtitle: "",
            };
        },
    },
    fields: [
        {
            name: 'title',
            type: 'string',
        },
        {
            name: 'icons',
            type: 'array',
            of: [
                {
                    name: "icon",
                    type: "image",
                    options: { hotspot: true },
                }
            ]
        },
    ],
};
