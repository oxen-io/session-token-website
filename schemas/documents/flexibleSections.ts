import { defineArrayMember } from 'sanity';

type ModulesSchemaType =
  | 'hero'
  | 'iconStrip'
  | 'roadmapHero'
  | 'roadmapTabs'
  | 'joinCta'
  | 'statsTiles'
  | 'tileGroup'
  | 'tileCarousel'
  | 'copyAndImage'
  | 'postGrid'
  | 'comingSoon'
  | 'genericCta'
  | 'faqsList'
  | 'basicCopy';

export type ModulesArraysSchemaType = Array<ModulesSchemaType>;

const modules: ModulesArraysSchemaType = [
  'hero',
  'iconStrip',
  'roadmapHero',
  'roadmapTabs',
  'joinCta',
  'statsTiles',
  'tileGroup',
  'tileCarousel',
  'copyAndImage',
  'postGrid',
  'comingSoon',
  'genericCta',
  'faqsList',
  'basicCopy',
];

const flexibleSections = modules.map((component) =>
  defineArrayMember({
    type: component,
  })
);

export default flexibleSections;
