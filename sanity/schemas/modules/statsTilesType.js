export const statsTilesType = {
    name: "statsTiles",
    type: "object",
    title: "Stats Tiles",
    preview: {
        prepare() {
            return {
                title: `Stats Tiles`,
                subtitle: "",
            };
        },
    },
    fields: [
        {
            name: 'tiles',
            type: 'array',
            title: 'Tiles',
            of: [
                {
                    type: 'object',
                    name: 'tile',
                    title: 'Tile',
                    fields: [
                        {
                            name: 'figure',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }, {
                            name: 'copy',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }, {
                            name: "backgroundImage",
                            type: "image",
                            options: { hotspot: true },
                        },
                    ]
                }
            ]
        },
    ],
};
