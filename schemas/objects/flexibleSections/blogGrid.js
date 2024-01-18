export const blogGrid = {
    name: "blogGrid",
    type: "object",
    title: "Blog grid",
    preview: {
        prepare() {
            return {
                title: `Blog grid`,
                subtitle: "",
            };
        },
    },
    fields: [
        {
            name: 'morePostsTitle',
            title: `"More posts" title`,
            type: 'string',
        },
    ],
};
