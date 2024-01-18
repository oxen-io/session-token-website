import { DocumentIcon, ImageIcon } from '@sanity/icons'

import flexibleSections from './flexibleSections'
import { baseData } from 'schemas/partials/base'

const page = {
    type: 'document',
    name: 'page',
    title: 'Page',
    icon: DocumentIcon,
    fields: [
        ...baseData,
        {
            name: 'modules',
            type: 'array',
            title: 'Page sections',
            of: flexibleSections,
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                subtitle: 'Page',
                title,
            }
        },
    },
}

export default page
