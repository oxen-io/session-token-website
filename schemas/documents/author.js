import { DocumentIcon } from '@sanity/icons'

import { baseData } from 'schemas/partials/base'

const author = {
    type: 'document',
    name: 'author',
    title: 'Authors',
    icon: DocumentIcon,
    fields: [
        ...baseData,
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                subtitle: 'Author',
                title,
            }
        },
    },
}

export default author