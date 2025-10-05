import navigation from './fr/navigation';
import blog from './fr/blog';
import article from './fr/article';
import meta from './fr/meta';
import header from './fr/header';
import hero from './fr/hero';
import companies from './fr/companies';
import chooseUs from './fr/chooseUs';
import services from './fr/services';
import process from './fr/process';
import team from './fr/team';
import testimonials from './fr/testimonials';
import whyChooseUs from './fr/whyChooseUs';
import contact from './fr/contact';
import footer from './fr/footer';
import techStack from './fr/techStack';
import cta from './fr/cta';
import faq from './fr/faq';
import contactMail from './fr/contactMail';
import referralMail from './fr/referralMail';
import formError from './fr/formError';
import referrals from './fr/referrals';
import errors from './fr/errors';

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
