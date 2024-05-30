// https://tailwindcss.com/docs/responsive-design
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

function makeNumber(input: string) {
  return Number(input.split('px')[0]);
}

const UI = {
  SM_BREAKPOINT: makeNumber(fullConfig.theme.screens.sm),
  MD_BREAKPOINT: makeNumber(fullConfig.theme.screens.md),
  LG_BREAKPOINT: makeNumber(fullConfig.theme.screens.lg),
  XL_BREAKPOINT: makeNumber(fullConfig.theme.screens.xl),
  '2XL_BREAKPOINT': makeNumber(fullConfig.theme.screens['2xl']),
  '3XL_BREAKPOINT': makeNumber(fullConfig.theme.screens['3xl']),
};

export { UI };
