import { useRuntimeConfig, useLocalePath } from '#imports';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type {
  FooterLegalLink,
  FooterNavigationData,
  FooterNavigationItem,
  FooterSectionKey,
  FooterSocialLink,
  FooterStrapiEntry,
} from '@/types/footer';

const addressLines = [
  'Griva Digeni 49',
  'CHRYSTALLA COURT',
  '5th floor, Flat/Office 51',
  '6036 Larnaca, Cyprus',
] as const;

const clutchUrl = 'https://clutch.co/profile/exim';

export const useFooterData = () => {
  const { t, locale } = useI18n();
  const runtimeConfig = useRuntimeConfig();
  const localePath = useLocalePath();

  interface FooterProxyResponse {
    industry: FooterStrapiEntry[];
    services: FooterStrapiEntry[];
  }

  const currentYear = new Date().getFullYear();

  const socialLinks = computed<FooterSocialLink[]>(() => [
    {
      name: 'LinkedIn',
      icon: 'mdi:linkedin',
      url: 'https://www.linkedin.com/company/as-exim-cyprus',
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
    // {
    //   name: 'Clutch',
    //   icon: 'bi:clutch',
    //   url: 'https://clutch.co/profile/exim',
    // },
  ]);

  const legalPrimaryLinks = computed<FooterLegalLink[]>(() => [
    {
      to: localePath('/privacy'),
      label: t('footer.navigation.legal.items.privacyPolicy'),
    },
    {
      to: localePath('/terms'),
      label: t('footer.navigation.legal.items.termsOfService'),
    },
    {
      to: localePath('/cookie-policy'),
      label: t('footer.navigation.legal.items.cookiePolicy'),
    },
  ]);

  const legalSecondaryLink = computed<FooterLegalLink>(() => ({
    to: localePath('/referrals'),
    label: t('footer.navigation.legal.items.referralProgram'),
  }));

  const mapStrapiItems = (
    section: FooterSectionKey,
    items: FooterStrapiEntry[] | undefined,
  ): FooterNavigationItem[] => {
    if (!items?.length) return [];

    const mappedItems = items
      .filter(item => item.showInFooter !== false)
      .map(item => ({
        id: item.documentId ?? item.id,
        label: item.footerLabel?.trim() || item.title.trim(),
        slug: item.slug,
        footerOrder: item.footerOrder ?? Number.MAX_SAFE_INTEGER,
        section,
      }));

    return mappedItems.length ? mappedItems : [];
  };

  const loadNavigation = async (lang?: string): Promise<FooterNavigationData> => {
    try {
      const proxyResponse = await $fetch<FooterProxyResponse>('/api/footer-navigation', {
        query: { locale: lang || locale.value },
      });

      return {
        industry: mapStrapiItems('industry', proxyResponse.industry ?? []),
        services: mapStrapiItems('services', proxyResponse.services ?? []),
      };
    } catch {
      return {
        industry: [],
        services: [],
      };
    }
  };

  const resolveNavigationTarget = (item: FooterNavigationItem): string => {
    const basePath = item.section === 'industry' ? '/industry' : '/services';
    return localePath(`${basePath}/${item.slug}`);
  };

  return {
    addressLines,
    clutchUrl,
    currentYear,
    legalPrimaryLinks,
    legalSecondaryLink,
    loadNavigation,
    resolveNavigationTarget,
    socialLinks,
  };
};
