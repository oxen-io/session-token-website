import type { PageSchemaType } from '@/schemas/documents/page';
import type { ButtonSchemaType } from '@/schemas/objects/button';
import type { LinkSchemaType } from '@/schemas/objects/link';
import type { SocialLinksSchemaType } from '@/schemas/partials/socialLinks';
import type { SanityImage } from './sanity.image';

type SanityFieldTypeMap = {
  string: string;
  slug: {
    current: string;
  };
  text: string;
  number: number;
  boolean: boolean;
  date: Date;
  reference: any;
  image: SanityImage;
  object: Record<string, unknown>;
  array: Array<any>;
  url: string;
  page: PageSchemaType;
};

type CustomFieldTypeMap = {
  link: LinkSchemaType;
  button: ButtonSchemaType;
  socialLinks: Array<SocialLinksSchemaType>;
};

type FieldTypeMap = SanityFieldTypeMap & CustomFieldTypeMap;

type FieldType = keyof FieldTypeMap;

type Field = {
  name: string;
  type: FieldType;
};

export type SchemaFields<T extends Array<Field>> = {
  [P in T[number] as P['name']]: FieldTypeMap[P['type']];
};

export type DocumentFields = {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
};
