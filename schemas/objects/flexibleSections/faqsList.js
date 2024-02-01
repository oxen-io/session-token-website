import portableText from "schemas/partials/portableText"

export const faqsList = {
    name: "faqsList",
    type: "object",
    title: "FAQs List",
    preview: {
        prepare() {
            return {
                title: "FAQs List",
            };
        },
    },
    fields: [
        {
            name: 'categories',
            type: 'array',
            of: [
                {
                    name: 'category',
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            type: 'string'
                        }, {
                            name: 'faqs',
                            type: 'array',
                            of: [
                                {
                                    name: 'faq',
                                    type: 'object',
                                    fields: [
                                        {
                                            name: 'question',
                                            type: 'string'
                                        },
                                        portableText('answer', 'Answer')
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
};
