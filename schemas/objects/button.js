export const button = {
    title: 'Button',
    name: 'button',
    type: 'object',
    fields: [{
        title: 'Icon Name',
        name: 'iconName',
        type: 'string',
        options: {
            layout: 'dropdown',
            list: [
                { value: 'none', title: 'None' },
                { value: 'logo', title: 'Logo' },
                { value: 'logoWithCircle', title: 'Logo With Circle' },
            ],
        },
    }, {
        title: 'Icon After',
        name: 'iconAfter',
        type: 'boolean'
    }, {
        title: 'Is Primary',
        name: 'isPrimary',
        type: 'boolean'
    }, {
        title: 'Link',
        name: 'link',
        type: 'link'
    }],
    preview: {
        select: {
            title: 'link.title',
        },
        prepare({
            title,

        }) {
            return {
                title,
            };
        }
    }
};