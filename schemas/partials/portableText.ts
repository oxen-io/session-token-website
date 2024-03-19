import { defineArrayMember, defineField } from 'sanity';

const portableText = <T extends string>(name: T, title: string, description = undefined) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({ type: 'block' }),
      defineArrayMember({ type: 'image' }),
      defineArrayMember({ type: 'iframe' }),
    ],
    description,
  });

export default portableText;

export type CopyBlock = {
  _type: 'block';
  _key: string;
  style: string;
  children: Array<{
    text: string;
  }>;
};

export type CopyImage = {
  _type: 'image';
  asset: {
    _type: 'reference';
    _ref: string;
  };
};

export type CopyIframe = {
  _type: 'iframe';
  embedCode: string;
};

export type CopyFields = Array<CopyBlock | CopyImage | CopyIframe>;
