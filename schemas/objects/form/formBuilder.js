import { ComposeIcon } from '@sanity/icons'

const formBuilder = {
    name: 'formBuilder',
    title: 'Form Builder',
    icon: ComposeIcon,
    type: 'object',
    fields: [
        {
            name: 'formRows',
            title: 'Form Rows',
            type: 'array',
            of: [{ type: 'formRow' }],
        },
    ],
    preview: {
        prepare() {
            return {
                title: `Custom form setup`,
                subtitle: `Form Builder`,
            }
        },
    },
}

export default formBuilder
