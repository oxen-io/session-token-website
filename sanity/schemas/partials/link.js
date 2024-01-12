export default (name, title) => ({
    name,
    title,
    type: "object",
    fields: [
        {
            name: "label",
            type: "string",
            title: "Label",
        }, {
            name: "link",
            type: "string",
            title: "Link",
        }, {
            name: 'isPrimary',
            type: 'boolean',
            title: 'Is primary?'
        }, {
            name: 'iconName',
            type: 'string',
            options: {
                list: [
                    {
                        value: 'none',
                        title: 'none'
                    }, {
                        value: 'logoWithCircle',
                        title: 'logoWithCircle'
                    }, {
                        value: 'logo',
                        title: 'logo'
                    }
                ]
            }
        }
    ]
});
