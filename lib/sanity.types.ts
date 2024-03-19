import type { SanityImage } from './sanity.image';

type FieldTypeMap = {
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
  array: Array<unknown>;
};

type FieldType = keyof FieldTypeMap;

type Field = {
  name: string;
  type: FieldType;
};

export type SchemaFields<T extends Array<Field>> = {
  [P in T[number] as P['name']]: FieldTypeMap[P['type']];
};
