import { createClient, groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { tryGetFile } from "@sanity/asset-utils";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export const pageDataQuery = groq`
    ...
`;

export const urlFor = (source) => {
  return builder.image(source);
};

export const fileUrlFor = (source) => {
  try {
    const { asset } = tryGetFile(source?.asset?._ref, {
      projectId,
      dataset,
      apiVersion,
    });

    if (asset) {
      return asset.url;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const sanityFetch = async (query, params = {}, tags = []) => {
  return client.fetch(query, params, {
    next: {
      tags,
      revalidate: false
    },
  });
};