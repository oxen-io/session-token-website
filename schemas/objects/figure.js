const figure = {
    name: 'figure',
    title: 'Image',
    type: 'image',
    options: {
        hotspot: true,
    },
    fields: [
        {
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
            description: 'Important for SEO and accessiblity.',
        },
        {
            name: 'blur',
            type: 'boolean',
            title: 'Blur loading image?',
        },
    ],
    preview: {
        select: {
            imageUrl: 'asset.url',
            title: 'alt',
        },
    },
}

export default figure
