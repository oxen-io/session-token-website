import { defineArrayMember } from 'sanity';

const components = [
  'hero',
  'iconStrip',
  'roadmapHero',
  'roadmapTabs',
  'joinCta',
  'statsTiles',
  'tileGroup',
  'tileCarousel',
  'copyAndImage',
  'blogGrid',
  'comingSoon',
  'genericCta',
  'faqsList',
  'basicCopy',
];

const flexibleSections = components.map((component) =>
  defineArrayMember({
    type: component,
  })
);

export default flexibleSections;
