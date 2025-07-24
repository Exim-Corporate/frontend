import type { BlocksContent } from 'vue-strapi-blocks-renderer';

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: BlocksContent;
  slug: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  cover?: {
    id: number;
    url: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
  };
  authors?: StrapiAuthor[];
  categories?: StrapiArticleCategory[];
  tags?: {
    id: number;
    name: string;
    slug?: string;
  }[];
  localizations?: StrapiArticle[];
}

export interface StrapiArticleCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface StrapiAuthor {
  id: number;
  name: string;
  email?: string;
  position?: string;
  bio?: string;
  avatar?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  articles?: StrapiArticle[];
}

export interface StrapiCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  articles?: StrapiArticle[];
}

export interface StrapiTag {
  id: number;
  name: string;
  slug?: string;
  articles?: StrapiArticle[];
}
