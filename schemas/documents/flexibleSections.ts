import { defineArrayMember } from 'sanity';

const components = [
  'hero',
  'iconStrip',
  'roadmapHero',
  'roadmapTabs',
  'joinCta',
  'statsTiles',
  'tileCarousel',
  'copyAndImage',
  'blogGrid',
  'comingSoon',
  'genericCta',
  'faqsList',
];

const flexibleSections = components.map(component =>
  defineArrayMember({
    type: component,
  })
);

export default flexibleSections;