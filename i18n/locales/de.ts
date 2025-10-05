import meta from './de/meta';
import header from './de/header';
import navigation from './de/navigation';
import hero from './de/hero';
import companies from './de/companies';
import chooseUs from './de/chooseUs';
import services from './de/services';
import process from './de/process';
import team from './de/team';
import testimonials from './de/testimonials';
import whyChooseUs from './de/whyChooseUs';
import contact from './de/contact';
import footer from './de/footer';
import techStack from './de/techStack';
import cta from './de/cta';
import blog from './de/blog';
import article from './de/article';
import faq from './de/faq';
import contactMail from './de/contactMail';
import referralMail from './de/referralMail';
import formError from './de/formError';
import referrals from './de/referrals';
import errors from './de/errors';

export default defineI18nLocale(() => ({
  meta,
  header,
  navigation,
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
  blog,
  article,
  faq,
  contactMail,
  referralMail,
  error: formError,
  referrals,
  errors,
}));
