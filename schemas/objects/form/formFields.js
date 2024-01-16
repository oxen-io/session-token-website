const formFields = {
    name: 'formFields',
    title: 'Form Fields',
    type: 'object',
    fields: [
        {
            name: 'required',
            title: 'Required',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'fieldName',
            title: 'Field Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'placeholder',
            title: 'Placeholder',
            type: 'string',
        },
        {
            name: 'fieldId',
            title: 'Field ID',
            type: 'slug',
            options: {
                source: (doc, options) => options.parent.fieldName,
                maxLength: 200,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'inputType',
            title: 'Input Type',
            type: 'string',
            initialValue: 'text',
            options: {
                layout: 'dropdown',
                list: [
                    { value: 'text', title: 'Text input' },
                    { value: 'email', title: 'Email' },
                    { value: 'phone', title: 'Phone number' },
                    { value: 'textArea', title: 'Text area' },
                    { value: 'file', title: 'File upload' },
                ],
            },
            validation: (Rule) => Rule.required(),
        },
    ],
}

export default formFields
