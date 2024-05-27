import type { Page } from '@/schemas/documents/page';
import type { Post } from '@/schemas/documents/post';
import { isNull } from 'lodash';
import { log } from './logger';
import { sanityFetch, type SanitySettings } from './sanity.fetch';

export enum CMSDocument {
  Page = 'page',
  Post = 'post',
  Settings = 'settings',
}

export type CMSDocumentWithSlug = CMSDocument.Page | CMSDocument.Post;

/**
 * The fields that are common to all link types.
 */
const linkFields = `
  linkType,
  internalLink->{
    _type,
    "slug": slug.current,
  },
  href,
  title
` as const;

const PAGE_SPECIAL_SELECT = `
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
}` as const;

const POST_SPECIAL_SELECT = `...,
author->` as const;

const SETTIONS_SPECIAL_SELECT = `...,
menuItems[]->{
  _type,
  "slug": slug.current,\
  href,
  title,
  children[]->{
    _type,
    "slug": slug.current,
    title,
    overview,
  }
}` as const;

export const SPECIAL_SELECT = {
  [CMSDocument.Page]: PAGE_SPECIAL_SELECT,
  [CMSDocument.Post]: POST_SPECIAL_SELECT,
  [CMSDocument.Settings]: SETTIONS_SPECIAL_SELECT,
};
type SpecialSelectType =
  | typeof PAGE_SPECIAL_SELECT
  | typeof POST_SPECIAL_SELECT
  | typeof SETTIONS_SPECIAL_SELECT;

type CMSTypescriptMappings = {
  [CMSDocument.Page]: Page;
  [CMSDocument.Post]: Post;
  [CMSDocument.Settings]: SanitySettings;
};

export type QueryReturnTypeFull<T extends CMSDocument> = CMSTypescriptMappings[T];

type QueryFilter<D extends CMSDocument> = {
  // TODO - add support for nested fields
  field: Field<D>;
  operator: string;
  value: string | null;
};

type Field<D extends CMSDocument> = keyof CMSTypescriptMappings[D] | 'slug.current';

interface QueryParams<D extends CMSDocument> {
  from: D;
  select: Array<Field<D>>;
  where: Array<QueryFilter<D>>;
  options: {
    single?: boolean;
  };
}

export class QueryBuilder<D extends CMSDocument> {
  private query: QueryParams<D>;
  constructor(query: QueryParams<D>) {
    this.query = query;
  }

  get filterString() {
    return this.query.where.length > 0
      ? ` && ${this.query.where
          .map(filter => {
            return `${String(filter.field)} ${filter.operator} ${isNull(filter.value) ? 'null' : `"${filter.value}"`}`;
          })
          .join(' && ')}`
      : '';
  }

  get selectString() {
    return this.query.select.length > 0 ? `{\n${this.query.select.join(',')}\n}` : '';
  }

  get queryString() {
    return `*[_type == "${this.query.from}"${this.filterString}]${this.query.options?.single ? '[0]' : ''}${this.selectString}`;
  }
}

export class FilterBuilder<D extends CMSDocument> {
  private query: QueryParams<D>;
  constructor(query: QueryParams<D>) {
    this.query = query;
  }

  private fetch = <R>(single: boolean) => {
    if (single) {
      this.query.options.single = true;
    }

    const query = new QueryBuilder<D>(this.query).queryString;
    const whereTags = this.query.where.map(filter => `${String(filter.field)}:${filter.value}`);

    if (this.query.from === CMSDocument.Settings) {
      whereTags.push(...['page', 'topic']);
    }

    log.debug(
      `Next Cache Tags: [${this.query.from}, ${whereTags.join(', ')}]`,
      `\nQuery: ${query}`
    );

    return sanityFetch<R>({
      query,
      tags: [this.query.from, ...whereTags],
    });
  };

  public execute = () => this.fetch<Array<QueryReturnTypeFull<D>>>(false);
  public executeSingle = () => this.fetch<QueryReturnTypeFull<D>>(true);

  public eq = (field: Field<D>, value: string | null) => {
    this.query.where.push({
      field,
      operator: '==',
      value: value ?? null,
    });
    return this;
  };

  public gt = (field: Field<D>, value: string) => {
    this.query.where.push({
      field,
      operator: '>',
      value,
    });
    return this;
  };

  public lt = (field: Field<D>, value: string) => {
    this.query.where.push({
      field,
      operator: '<',
      value,
    });
    return this;
  };

  public gte = (field: Field<D>, value: string) => {
    this.query.where.push({
      field,
      operator: '>=',
      value,
    });
    return this;
  };

  public lte = (field: Field<D>, value: string) => {
    this.query.where.push({
      field,
      operator: '<=',
      value,
    });
    return this;
  };

  public neq = (field: Field<D>, value: string | null) => {
    this.query.where.push({
      field,
      operator: '!=',
      value: value ?? null,
    });
    return this;
  };
}

export class SelectBuilder<D extends CMSDocument> {
  private query: QueryParams<D>;
  constructor(query: QueryParams<D>) {
    this.query = query;
  }

  public select = (selects?: Array<Field<D> | SpecialSelectType>): FilterBuilder<D> => {
    // const selectString = selects ? `{\nselects.join('\n')\n}` : '';
    this.query.select = (selects as Array<Field<D>>) ?? [];
    return new FilterBuilder<D>(this.query);
  };
}

class SanityQuery {
  public from = <D extends CMSDocument>(document: D) => {
    const query = { from: document, select: [], where: [], options: {} };
    return new SelectBuilder<D>(query);
  };
}

export const sanityQuery = new SanityQuery();
