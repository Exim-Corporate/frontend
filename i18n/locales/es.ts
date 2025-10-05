import navigation from './es/navigation';
import blog from './es/blog';
import article from './es/article';
import meta from './es/meta';
import header from './es/header';
import hero from './es/hero';
import companies from './es/companies';
import chooseUs from './es/chooseUs';
import services from './es/services';
import process from './es/process';
import team from './es/team';
import testimonials from './es/testimonials';
import whyChooseUs from './es/whyChooseUs';
import contact from './es/contact';
import footer from './es/footer';
import techStack from './es/techStack';
import cta from './es/cta';
import faq from './es/faq';
import contactMail from './es/contactMail';
import referralMail from './es/referralMail';
import formError from './es/formError';
import referrals from './es/referrals';
import errors from './es/errors';

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
