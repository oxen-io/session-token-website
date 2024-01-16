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
    }
  }
`

export const topicBySlugQuery = groq`
  *[_type == "topic" && slug.current == $slug][0] {
    ...,
    parent->,
    "slug": select(
      defined(parent) => parent->slug.current + "/" + slug.current,
      slug.current
    ),
    content[] {
      _type,
      (_type == "content") => {
        ...,
      },
      (_type == "resources") => {
        ...,
      },
      (_type == "faq") => {
        ...,
      },
      (_type == "stats") => {
        ...,
      },
      (_type == "cta") => {
        ...,
        link {
          ${linkFields}
        },
      },
      (_type == "caseStudyCta") => {
        caseStudy-> {
          ...,
          coverImage {
            ...,
            asset->,
          },
        },
      },
      (_type == "relatedTopics") => {
        ...,
      },
      (_type == "topicGrid") => {
        ...,
      },
    }
  }
`

const portableTextQuery = `
  ...,
  markDefs[]{
    ...,
    internalLink->{
      _type,
      "slug": slug.current,
    },
  },
  children,
`

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    ...,
    content[] {
      ${portableTextQuery}
    },
    relatedTopic->,
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

export const topicsQuery = groq`
  *[_type == "topic"]|order(orderRank){
    ...,
    parent->,
    "slug": select(
      defined(parent) => parent->slug.current + "/" + slug.current,
      slug.current
    ),
    icon {
      ...,
      asset->,
    }
  }
`
