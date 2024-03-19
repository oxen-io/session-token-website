'use client';

import type { SanitySettings } from '@/lib/sanity.fetch';
import { createContext } from 'react';

export const SettingsContext = createContext({
  rewards: undefined,
  socialLinks: undefined,
  menuTopLink: undefined,
  mobileMenuCta: undefined,
  menuItems: undefined,
} as SanitySettings);

export const SettingsProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SanitySettings;
}) => {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
