export default {
    name: 'socialLinks',
    title: 'Social Links',
    type: 'array',
    of: [
        {
            type: 'object',
            title: 'Link',
            fields: [
                {
                    name: 'company',
                    title: 'Company',
                    type: "string",
                    options: {
                        list: [
                            { title: "X", value: "x" },
                            { title: "GitHub", value: "github" },
                            { title: "YouTube", value: "youtube" },
                            { title: "Reddit", value: "reddit" },
                            { title: "Instagram", value: "instagram" },
                            { title: "LinkedIn", value: "linkedin" },
                            { title: "Vimeo", value: "vimeo" },
                            { title: "WhatsApp", value: "whatsapp" },
                            { title: "Facebook", value: "facebook" },
                            { title: "Telegram", value: "telegram" },
                            { title: "Session", value: "session" },
                            { title: "RSS", value: "rss" },
                            { title: "Discord", value: "discord" }
                        ],
                    },
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'link',
                    title: 'Link',
                    type: 'url',
                },
            ],
        },
    ],
}