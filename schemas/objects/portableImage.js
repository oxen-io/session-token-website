const portableImage = {
    name: 'portableImage',
    type: 'object',
    title: 'Image',
    fields: [
        {
            name: 'image',
            type: 'figure',
            title: 'Image',
        },
        {
            name: 'caption',
            type: 'string',
            title: 'Caption',
        },
    ],
    preview: {
        select: {
            title: 'caption',
            imageUrl: 'image.asset.url',
        },
    },
}

export default portableImage
