export type FooterSectionKey = 'industry' | 'services';

export interface FooterFallbackItem {
  labelKey: string;
  slug: string;
  footerOrder: number;
}

export interface FooterNavigationItem {
  id: number | string;
  label: string;
  slug: string;
  footerOrder: number;
  section: FooterSectionKey;
}

export interface FooterNavigationData {
  industry: FooterNavigationItem[];
  services: FooterNavigationItem[];
}

export interface FooterStrapiEntry {
  id: number;
  documentId?: string;
  title: string;
  footerLabel?: string;
  slug: string;
  footerOrder?: number;
  showInFooter?: boolean;
}

export interface FooterLegalLink {
  to: string;
  label: string;
}

export interface FooterSocialLink {
  name: string;
  icon: string;
  url: string;
}
