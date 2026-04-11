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
  cover: StrapiUploadFile;
  authors?: StrapiAuthor[];
  category?: StrapiArticleCategory | null;
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

export interface StrapiUploadFile {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface StrapiTag {
  id: number;
  name: string;
  slug?: string;
  articles?: StrapiArticle[];
}

export interface StrapiPageSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

export interface StrapiIndustryCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface StrapiIndustryHero {
  title: string;
  description?: string;
  image?: StrapiUploadFile | null;
  categories?: StrapiIndustryCategory[];
}

export interface StrapiIndustryDescriptionCard {
  image?: StrapiUploadFile | null;
  title: string;
  description?: string;
}

export interface StrapiIndustryDescriptionAccordion {
  title: string;
  description?: string;
  card?: StrapiIndustryDescriptionCard | null;
}

export interface StrapiIndustryDescription {
  eyebrowPrefix?: string;
  eyebrowCurrent?: string;
  title: string;
  description?: string;
  accordions: StrapiIndustryDescriptionAccordion[];
}

export interface StrapiIndustryStatsAccordion {
  title: string;
  description?: string;
}

export interface StrapiIndustryStats {
  title: string;
  accordions: StrapiIndustryStatsAccordion[];
}

export interface StrapiIndustryPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  footerLabel?: string;
  footerOrder?: number;
  showInFooter?: boolean;
  hero?: StrapiIndustryHero | null;
  industryDescription?: StrapiIndustryDescription | null;
  industryStats?: StrapiIndustryStats | null;
  seo?: StrapiPageSeo;
}

export interface StrapiReferralCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface StrapiReferralHero {
  title: string;
  description?: string;
  buttonLabel?: string;
  image?: StrapiUploadFile | null;
  categories?: StrapiReferralCategory[];
}

export interface StrapiReferralPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  footerLabel?: string;
  footerOrder?: number;
  showInFooter?: boolean;
  hero?: StrapiReferralHero | null;
  seo?: StrapiPageSeo;
}

export interface StrapiServicePage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  footerLabel?: string;
  footerOrder?: number;
  showInFooter?: boolean;
  hero?: StrapiServiceHero | null;
  serviceCardsSection?: StrapiServiceCardsSection | null;
  serviceAboutSection?: StrapiServiceAboutSection | null;
  serviceBenefitsSection?: StrapiServiceBenefitsSection | null;
  seo?: StrapiPageSeo;
}

export type StrapiCardDisplayType = 'static' | 'withBackground' | 'withPicture';

export interface StrapiCard {
  title: string;
  description?: string;
  displayType?: StrapiCardDisplayType;
  image?: StrapiUploadFile | null;
}

export interface StrapiServiceCardsSection {
  title: string;
  description?: string;
  buttonLabel?: string;
  cards: StrapiCard[];
}

export type StrapiServiceAboutIconType = 'withSvg' | 'static';

export interface StrapiServiceAboutItem {
  iconType?: StrapiServiceAboutIconType;
  icon: string;
  technologyName: string;
}

export interface StrapiServiceAboutSection {
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  accordions: StrapiServiceAboutItem[];
}

export type StrapiServiceBenefitItemType = 'metric' | 'statement';

export interface StrapiServiceBenefitItem {
  itemType?: StrapiServiceBenefitItemType;
  headline: string;
  description?: string;
}

export interface StrapiServiceBenefitsSection {
  title: string;
  items: StrapiServiceBenefitItem[];
}

export interface StrapiServiceCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface StrapiServiceHero {
  title: string;
  description?: string;
  imagePrimary?: StrapiUploadFile | null;
  imageSecondary?: StrapiUploadFile | null;
  categories?: StrapiServiceCategory[];
}
