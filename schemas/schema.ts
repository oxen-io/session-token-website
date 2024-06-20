import type { SchemaTypeDefinition } from 'sanity';
import { blogGrid } from './objects/flexibleSections/blogGrid';
import { comingSoon } from './objects/flexibleSections/comingSoon';
import { copyAndImage } from './objects/flexibleSections/copyAndImage';
import { faqsList } from './objects/flexibleSections/faqsList';
import { genericCta } from './objects/flexibleSections/genericCta';
import { hero } from './objects/flexibleSections/hero';
import { iconStrip } from './objects/flexibleSections/iconStrip';
import { joinCta } from './objects/flexibleSections/joinCta';
import { statsTiles } from './objects/flexibleSections/statsTiles';
import { tileCarousel } from './objects/flexibleSections/tileCarousel';

import { button } from './objects/button';
import figure from './objects/figure';
import formBuilder from './objects/form/formBuilder';
import formFields from './objects/form/formFields';
import formRow from './objects/form/formRow';
import { iframe } from './objects/iframe';
import link from './objects/link';
import portableImage from './objects/portableImage';
import quote from './objects/quote';
import socialLinks from './partials/socialLinks';

import author from './documents/author';
import forms from './documents/forms';
import navigationLink from './documents/navigationLink';
import page from './documents/page';
import post from './documents/post';
import { basicCopy } from './objects/flexibleSections/basicCopy';
import { roadmapHero } from './objects/flexibleSections/roadmapHero';
import { roadmapSection } from './objects/flexibleSections/roadmapSection';
import { roadmapTabs } from './objects/flexibleSections/roadmapTabs';
import { tileGroup } from './objects/flexibleSections/tileGroup';
import settings from './singletons/settings';

const schemas = [
  // Singletons
  settings,

  // Documents
  page,
  post,
  author,
  navigationLink,
  forms,

  // Modules
  hero,
  roadmapHero,
  roadmapSection,
  roadmapTabs,
  joinCta,
  statsTiles,
  tileGroup,
  tileCarousel,
  iconStrip,
  copyAndImage,
  blogGrid,
  comingSoon,
  genericCta,
  faqsList,
  basicCopy,

  // Objects
  figure,
  link,
  formFields,
  formRow,
  formBuilder,
  quote,
  portableImage,
  button,
  iframe,
  socialLinks,
] satisfies Array<SchemaTypeDefinition>;

export default schemas;
