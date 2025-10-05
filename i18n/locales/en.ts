import navigation from './en/navigation';
import blog from './en/blog';
import article from './en/article';
import meta from './en/meta';
import header from './en/header';
import hero from './en/hero';
import companies from './en/companies';
import chooseUs from './en/chooseUs';
import services from './en/services';
import process from './en/process';
import team from './en/team';
import testimonials from './en/testimonials';
import whyChooseUs from './en/whyChooseUs';
import contact from './en/contact';
import footer from './en/footer';
import techStack from './en/techStack';
import cta from './en/cta';
import faq from './en/faq';
import contactMail from './en/contactMail';
import referralMail from './en/referralMail';
import formError from './en/formError';
import referrals from './en/referrals';
import errors from './en/errors';

export default defineI18nLocale(() => ({
  navigation,
  blog,
  article,
  meta,
  header,
  hero,
  companies,
  chooseUs,
  services,
  process,
  team,
  testimonials,
  whyChooseUs,
  contact,
  footer,
  techStack,
  cta,
  faq,
  contactMail,
  referralMail,
  error: formError,
  referrals,
  errors,
}));
