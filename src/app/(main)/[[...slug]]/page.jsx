import PageWrapper from "@/components/PageWrapper/PageWrapper"
import { sanityFetch } from "@/utils/sanityClient"
import { notFound } from "next/navigation"

import Modules from "@/components/Modules"

const getSlug = slug => {
  const isArray = Array.isArray(slug)

  const lastSegment = isArray ? slug[slug.length - 1] : slug

  const _slug = (() => {
    switch (lastSegment) {
      case "":
      case "/":
      case "index":
      case undefined:
        return "home"
      default:
        return slug
    }
  })()

  return _slug
}

const pageQuery = slug => {
  const _slug = getSlug(slug)

  return sanityFetch(
    `*[_type == "page" && slug.current == "${_slug}" ][0] {
      ...,
      modules[] {
        ...,
      }
    }`,
    {},
    [`page_${_slug}`],
  )
}

export async function generateStaticParams() {
  const allPages = await sanityFetch(
    `*[_type == "page"] {
      ...
    }`,
    {},
    [`page`],
  )

  return allPages.map(({ slug }) => {
    return ({
      slug: [slug?.current],
    })
  })
}

export async function generateMetadata({ params: { slug } }) {
  const pageData = await pageQuery(slug);

  if (!pageData) {
    notFound();
  }

  const { metadata, title } = pageData;

  const { title: metaTitle, description } = metadata || {};

  return {
    title: `${metaTitle || title} - Session Token`,
    description: description || "",
  };
}

export default async function Page({ params: { slug } }) {
  const pageData = await pageQuery(slug)

  if (!pageData) {
    notFound()
  }

  const { modules } = pageData;

  return (
    <PageWrapper>
      <Modules modules={modules} />
    </PageWrapper>
  );
}
