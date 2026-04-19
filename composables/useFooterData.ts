import { useRuntimeConfig } from 'nuxt/app';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type {
  FooterFallbackItem,
  FooterLegalLink,
  FooterNavigationData,
  FooterNavigationItem,
  FooterSectionKey,
  FooterSocialLink,
  FooterStrapiEntry,
} from '@/types/footer';

const industryFallbackItems: FooterFallbackItem[] = [
  { labelKey: 'footer.navigation.industry.items.healthcare', slug: 'healthcare', footerOrder: 1 },
  { labelKey: 'footer.navigation.industry.items.logistics', slug: 'logistics', footerOrder: 2 },
  { labelKey: 'footer.navigation.industry.items.retail', slug: 'retail', footerOrder: 3 },
  {
    labelKey: 'footer.navigation.industry.items.financeAndFinTech',
    slug: 'finance-fintech',
    footerOrder: 4,
  },
  {
    labelKey: 'footer.navigation.industry.items.educationAndEdTech',
    slug: 'education-edtech',
    footerOrder: 5,
  },
  {
    labelKey: 'footer.navigation.industry.items.manufacturing',
    slug: 'manufacturing',
    footerOrder: 6,
  },
];

const serviceFallbackItems: FooterFallbackItem[] = [
  {
    labelKey: 'footer.navigation.services.items.artificialIntelligence',
    slug: 'artificial-intelligence',
    footerOrder: 1,
  },
  {
    labelKey: 'footer.navigation.services.items.customSoftwareDevelopment',
    slug: 'custom-software-development',
    footerOrder: 2,
  },
  {
    labelKey: 'footer.navigation.services.items.webApplicationDevelopment',
    slug: 'web-application-development',
    footerOrder: 3,
  },
  {
    labelKey: 'footer.navigation.services.items.mobileDevelopment',
    slug: 'mobile-development',
    footerOrder: 4,
  },
  {
    labelKey: 'footer.navigation.services.items.aiChatbots',
    slug: 'ai-chatbots',
    footerOrder: 5,
  },
  {
    labelKey: 'footer.navigation.services.items.dataEngineering',
    slug: 'data-engineering',
    footerOrder: 6,
  },
  {
    labelKey: 'footer.navigation.services.items.cloudServices',
    slug: 'cloud-services',
    footerOrder: 7,
  },
  { labelKey: 'footer.navigation.services.items.vcto', slug: 'vcto', footerOrder: 8 },
  {
    labelKey: 'footer.navigation.services.items.enterpriseSearch',
    slug: 'enterprise-search',
    footerOrder: 9,
  },
];

const addressLines = [
  'Griva Digeni 49',
  'CHRYSTALLA COURT',
  '5th floor, Flat/Office 51',
  '6036 Larnaca, Cyprus',
] as const;

const mapFallbackItems = (
  section: FooterSectionKey,
  items: FooterFallbackItem[],
  translate: (key: string) => string,
): FooterNavigationItem[] => {
  return items.map(item => ({
    id: `${section}-${item.slug}`,
    label: translate(item.labelKey),
    slug: item.slug,
    footerOrder: item.footerOrder,
    section,
  }));
};

const sortFooterItems = (items: FooterNavigationItem[]) => {
  return [...items].sort((left, right) => left.footerOrder - right.footerOrder);
};

export const useFooterData = () => {
  const { t, locale } = useI18n();
  const runtimeConfig = useRuntimeConfig();

  interface FooterProxyResponse {
    industry: FooterStrapiEntry[];
    services: FooterStrapiEntry[];
  }

  const currentYear = new Date().getFullYear();

  const socialLinks = computed<FooterSocialLink[]>(() => [
    {
      name: 'LinkedIn',
      icon: 'mdi:linkedin',
      url: 'https://linkedin.com/company/as-exim-ltd',
    },
    {
      name: 'Telegram',
      icon: 'mdi:telegram',
      url: 'https://t.me/ASEximsupport',
    },
    {
      name: 'Gmail',
      icon: 'mdi:gmail',
      url: `mailto:${runtimeConfig.public.supportEmail}`,
    },
    {
      name: 'X',
      icon: 'bi:twitter-x',
      url: 'https://x.com/eximltdcy',
    },
  ]);

  const legalPrimaryLinks = computed<FooterLegalLink[]>(() => [
    {
      to: '/privacy',
      label: t('footer.navigation.legal.items.privacyPolicy'),
    },
    {
      to: '/terms',
      label: t('footer.navigation.legal.items.termsOfService'),
    },
    {
      to: '/cookie-policy',
      label: t('footer.navigation.legal.items.cookiePolicy'),
    },
  ]);

  const legalSecondaryLink = computed<FooterLegalLink>(() => ({
    to: '/referrals',
    label: t('footer.navigation.legal.items.referralProgram'),
  }));

  const getFallbackNavigation = (): FooterNavigationData => ({
    industry: mapFallbackItems('industry', industryFallbackItems, t),
    services: mapFallbackItems('services', serviceFallbackItems, t),
  });

  const mapStrapiItems = (
    section: FooterSectionKey,
    items: FooterStrapiEntry[] | undefined,
  ): FooterNavigationItem[] => {
    if (!items?.length) {
      return getFallbackNavigation()[section];
    }

    const mappedItems = items
      .filter(item => item.showInFooter !== false)
      .map(item => ({
        id: item.documentId ?? item.id,
        label: item.footerLabel?.trim() || item.title.trim(),
        slug: item.slug,
        footerOrder: item.footerOrder ?? Number.MAX_SAFE_INTEGER,
        section,
      }));

    return mappedItems.length ? sortFooterItems(mappedItems) : getFallbackNavigation()[section];
  };

  const loadNavigation = async (): Promise<FooterNavigationData> => {
    try {
      const proxyResponse = await $fetch<FooterProxyResponse>('/api/footer-navigation', {
        query: { locale: locale.value },
      });

      return {
        industry: mapStrapiItems('industry', proxyResponse.industry ?? []),
        services: mapStrapiItems('services', proxyResponse.services ?? []),
      };
    } catch {
      return getFallbackNavigation();
    }
  };

  const resolveNavigationTarget = (item: FooterNavigationItem): string => {
    const basePath = item.section === 'industry' ? '/industry' : '/services';
    return `${basePath}/${item.slug}`;
  };

  return {
    addressLines,
    currentYear,
    getFallbackNavigation,
    legalPrimaryLinks,
    legalSecondaryLink,
    loadNavigation,
    resolveNavigationTarget,
    socialLinks,
  };
};
