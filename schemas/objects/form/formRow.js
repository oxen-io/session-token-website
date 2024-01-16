const formRow = {
    title: 'Form Row',
    name: 'formRow',
    type: 'object',
    fields: [
        {
            name: 'rowTitle',
            title: 'Row Title',
            type: 'string',
        },
        {
            name: 'formFields',
            title: 'Form Fields',
            type: 'array',
            of: [{ type: 'formFields' }],
            validation: (Rule) => Rule.min(1).max(2),
        },
    ],
    preview: {
        select: {
            title: 'rowTitle',
        },
        prepare({ title }) {
            return {
                title: `Form Row - ${title || 'untitled'}`,
            }
        },
    },
}

export default formRow
