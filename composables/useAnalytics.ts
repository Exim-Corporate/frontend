/**
 * Analytics composable for tracking user interactions
 * Provides type-safe methods for tracking various events with Google Tag Manager
 *
 * @example
 * ```ts
 * const { trackNavigation, trackFormSubmit, trackCTAClick } = useAnalytics()
 *
 * // Track navigation
 * trackNavigation('/about', 'About Page')
 *
 * // Track form submission
 * trackFormSubmit('contact-form', true)
 *
 * // Track CTA clicks
 * trackCTAClick('header-cta', 'Get Started')
 * ```
 */

/**
 * Navigation tracking event parameters
 */
interface NavigationEventParams {
  page_location?: string;
  page_title?: string;
  page_referrer?: string;
  event_category?: string;
  event_label?: string;
  value?: number;
}

/**
 * Form submission event parameters
 */
interface FormEventParams {
  form_id: string;
  form_name?: string;
  success: boolean;
  event_category?: string;
  event_label?: string;
}

/**
 * CTA click event parameters
 */
interface CTAEventParams {
  cta_id: string;
  cta_text?: string;
  cta_location?: string;
  event_category?: string;
  event_label?: string;
}

/**
 * Custom event parameters for flexible tracking
 */
interface CustomEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

export function useAnalytics() {
  const { gtag } = useGtag();

  /**
   * Track navigation/page view events
   * @param path - The navigation path (e.g., '/about', '#services')
   * @param title - Optional page/section title
   * @param referrer - Optional referrer information
   */
  const trackNavigation = (path: string, title?: string, referrer?: string): void => {
    const params: NavigationEventParams = {
      event_category: 'Navigation',
      event_label: path,
      page_location: path,
    };

    if (title) params.page_title = title;
    if (referrer) params.page_referrer = referrer;

    gtag('event', 'page_view', params);
  };

  /**
   * Track form submission events
   * @param formId - Unique form identifier
   * @param success - Whether the submission was successful
   * @param formName - Optional form name for better tracking
   */
  const trackFormSubmit = (formId: string, success: boolean, formName?: string): void => {
    const params: FormEventParams = {
      form_id: formId,
      success,
      event_category: 'Form',
      event_label: success ? 'Submit Success' : 'Submit Failed',
    };

    if (formName) params.form_name = formName;

    gtag('event', success ? 'form_submit' : 'form_error', params);
  };

  /**
   * Track CTA (Call-to-Action) button clicks
   * @param ctaId - Unique CTA identifier
   * @param ctaText - The text/content of the CTA
   * @param location - Where the CTA is located (e.g., 'header', 'footer', 'hero')
   */
  const trackCTAClick = (ctaId: string, ctaText?: string, location?: string): void => {
    const params: CTAEventParams = {
      cta_id: ctaId,
      event_category: 'CTA',
      event_label: ctaText || ctaId,
    };

    if (ctaText) params.cta_text = ctaText;
    if (location) params.cta_location = location;

    gtag('event', 'cta_click', params);
  };

  /**
   * Track custom events with flexible parameters
   * @param eventName - The name of the custom event
   * @param params - Custom event parameters
   */
  const trackCustomEvent = (eventName: string, params?: CustomEventParams): void => {
    gtag('event', eventName, {
      event_category: 'Custom',
      ...params,
    });
  };

  /**
   * Track scroll depth for engagement metrics
   * @param depth - Scroll depth percentage (25, 50, 75, 100)
   * @param page - Optional page identifier
   */
  const trackScrollDepth = (depth: 25 | 50 | 75 | 100, page?: string): void => {
    gtag('event', 'scroll', {
      event_category: 'Engagement',
      event_label: `${depth}%`,
      value: depth,
      page_location: page || window.location.pathname,
    });
  };

  /**
   * Track file downloads
   * @param fileName - Name of the downloaded file
   * @param fileUrl - URL of the downloaded file
   */
  const trackFileDownload = (fileName: string, fileUrl: string): void => {
    gtag('event', 'file_download', {
      event_category: 'File',
      event_label: fileName,
      file_name: fileName,
      file_url: fileUrl,
    });
  };

  /**
   * Track outbound link clicks
   * @param url - The external URL being clicked
   * @param linkText - Optional link text for context
   */
  const trackOutboundClick = (url: string, linkText?: string): void => {
    gtag('event', 'click', {
      event_category: 'Outbound Link',
      event_label: url,
      outbound: true,
      link_text: linkText,
      link_url: url,
    });
  };

  return {
    // Core tracking methods
    trackNavigation,
    trackFormSubmit,
    trackCTAClick,
    trackCustomEvent,

    // Engagement tracking
    trackScrollDepth,
    trackFileDownload,
    trackOutboundClick,
  };
}
