import { groq } from 'next-sanity'

const linkFields = `
  linkType,
  internalLink->{
    _type,
    "slug": slug.current,
  },
  href,
  title
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    ...,
    modules[] {
      ...,
      (_type == "hero") => {
        ...,
        buttons[] {
          ...,
          link {
            ${linkFields}
          }
        },
      },
    }
  }
`

export const documentPaths = (type) => groq`
  *[_type == ${type} && slug.current != null].slug.current
`

export const settingsQuery = groq`
  *[_type == "settings"][0] {
    ...,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title,
      children[]->{
        _type,
        "slug": slug.current,
        title,
        overview,
      }
    },
  }
`