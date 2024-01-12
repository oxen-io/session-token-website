import { CogIcon, DocumentIcon } from "@sanity/icons";

const settings = {
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  preview: {
    prepare() {
      return {
        title: "Settings",
      };
    },
  },
  groups: [
    {
      name: 'general',
      title: 'General',
    }, {
      name: 'menu',
      title: 'Menu'
    }
  ],
  fields: [
    {
      name: "headerCopy",
      title: "Header copy",
      type: "string",
      validation: (rule) => rule.required(),
      group: 'general'
    }, {
      name: 'address',
      title: 'Address',
      type: 'text',
      validation: (rule) => rule.required(),
      group: 'general'
    }, {
      name: 'contact',
      title: 'Contact',
      type: 'object',
      description: `You can use [square brackets] in the phone number, we'll filter them out.`,
      group: 'general',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (rule) => rule.required(),
        }, {
          name: 'phone',
          title: 'Phone',
          type: 'string',
          validation: (rule) => rule.required(),
        }
      ]
    }, {
      name: 'socials',
      title: 'Socials',
      type: 'array',
      group: 'general',
      of: [
        {
          type: 'object',
          name: 'social',
          title: 'Social',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }, {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }
          ]
        }
      ]
    }, {
      name: 'footerContactCopy',
      title: 'Footer contact copy',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'general'
    }, {
      name: 'footerNewBusiness',
      title: `Footer "new business" section`,
      type: 'object',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Name',
        }, {
          name: 'role',
          type: 'string',
          title: 'Role'
        }, {
          name: 'email',
          type: 'string',
          title: 'Email'
        }, {
          name: 'phone',
          type: 'string',
          title: 'Phone'
        }
      ]
    },{
      name: 'footerCareersCopy',
      title: 'Careers copy',
      type: 'text',
    }, {
      name: 'menu',
      title: 'Header menu',
      group: 'menu',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'page'
            }
          ]
        }
      ]
    }
  ],
};

export default settings;
