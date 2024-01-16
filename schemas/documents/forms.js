import { ComposeIcon } from '@sanity/icons'

const forms = {
    name: 'forms',
    type: 'document',
    title: 'Forms',
    icon: ComposeIcon,
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
        },
        {
            name: 'formBuilder',
            title: 'Form Builder',
            type: 'formBuilder',
        },
        {
            name: 'buttonTitle',
            type: 'string',
        },
        {
            name: 'completionMessage',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    type: 'string',
                },
                {
                    name: 'body',
                    type: 'text',
                },
            ],
        },
        {
            name: 'formSparkID',
            type: 'string',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title,
            }
        },
    },
}

export default forms
