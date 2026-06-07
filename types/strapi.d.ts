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
  categories?: StrapiArticleCategory[];
  tags?: {
    id: number;
    name: string;
    slug?: string;
  }[];
  localizations?: StrapiArticle[];
}

export interface StrapiArticlePagePayload {
  article: StrapiArticle;
  relatedArticles: StrapiArticle[];
  resolvedLocale: string;
}

export interface StrapiArticleListPayload {
  data: StrapiArticle[];
  meta: StrapiResponse<StrapiArticle[]>['meta'];
  resolvedLocale: string;
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

export interface StrapiStandApartStat {
  value: string;
  label: string;
}

export interface StrapiStandApartStatsSection {
  title: string;
  stats: StrapiStandApartStat[];
}

export interface StrapiIndustryExpertiseSection {
  title: string;
  buttonLabel: string;
}

export interface StrapiTestimonialCard {
  name: string;
  role: string;
  company: string;
  order?: number;
  rating: number;
  comment: string;
  projectType: string;
}

export interface StrapiTestimonialsSection {
  title: string;
  subtitle?: string;
  cards: StrapiTestimonialCard[];
}

export interface StrapiProcessStep {
  title: string;
  description: string;
}

export interface StrapiProcessSection {
  title: string;
  subtitle?: string;
  steps: StrapiProcessStep[];
}

export interface StrapiWhyChooseUsItem {
  title: string;
  description: string;
}

export interface StrapiWhyChooseUsSection {
  title: string;
  items: StrapiWhyChooseUsItem[];
}

export interface StrapiServicesProvideSection {
  title: string;
  subtitle: string;
  buttonLabel: string;
}

export interface StrapiCtaSection {
  title: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  image?: StrapiUploadFile | null;
  imageAlt?: string;
}

export interface StrapiHomePage {
  id: number;
  documentId: string;
  ctaSection?: StrapiCtaSection | null;
  standApartStats?: StrapiStandApartStatsSection | null;
  industryExpertiseSection?: StrapiIndustryExpertiseSection | null;
  testimonialsSection?: StrapiTestimonialsSection | null;
  processSection?: StrapiProcessSection | null;
  whyChooseUsSection?: StrapiWhyChooseUsSection | null;
  servicesProvideSection?: StrapiServicesProvideSection | null;
}

export interface StrapiBlogPage {
  id: number;
  documentId: string;
  ctaSection?: StrapiCtaSection | null;
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
  ctaSection?: StrapiCtaSection | null;
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

export type StrapiReferralProgramStyleVariant = 'pattern' | 'plain';

export interface StrapiReferralProgramPoint {
  text: string;
}

export interface StrapiReferralProgramCard {
  title: string;
  description?: string;
  points: StrapiReferralProgramPoint[];
  exampleLabel?: string;
  exampleText?: string;
  styleVariant?: StrapiReferralProgramStyleVariant;
}

export interface StrapiReferralProgramSection {
  title: string;
  description?: string;
  cards: StrapiReferralProgramCard[];
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
  referralProgramSection?: StrapiReferralProgramSection | null;
  ctaSection?: StrapiCtaSection | null;
  seo?: StrapiPageSeo;
}

export interface StrapiServicePage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  headerOrder?: number;
  footerLabel?: string;
  footerOrder?: number;
  showInFooter?: boolean;
  hero?: StrapiServiceHero | null;
  serviceCardsSection?: StrapiServiceCardsSection | null;
  serviceAboutSection?: StrapiServiceAboutSection | null;
  serviceBenefitsSection?: StrapiServiceBenefitsSection | null;
  ctaSection?: StrapiCtaSection | null;
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
  subheader: string;
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

// Header Navigation

export interface StrapiHeaderNavLink {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  headerOrder?: number;
  footerOrder?: number;
}

export interface StrapiHeaderDropdown {
  label: string;
  primaryGroupTitle?: string;
  links?: StrapiHeaderNavLink[];
  extraGroupTitle?: string;
  extraLinks?: StrapiHeaderNavLink[];
  image?: StrapiUploadFile | null;
}

export interface StrapiHeaderNavigation {
  id: number;
  aiDevelopmentDropdown?: StrapiHeaderDropdown | null;
  expertiseDropdown?: StrapiHeaderDropdown | null;
  blogLabel?: string;
  blogPath?: string;
}

export interface StrapiMainCalendly {
  id: number;
  title: string;
  link: string;
}

export interface StrapiFaqSectionItem {
  id?: number;
  title: string;
  description: string;
}

export interface StrapiFaqSection {
  id: number;
  title: string;
  description: string;
  accordions: StrapiFaqSectionItem[];
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}
