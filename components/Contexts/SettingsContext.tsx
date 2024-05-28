'use client';

import type { SettingsSchemaType } from '@/lib/sanity.fetch';
import { createContext } from 'react';

export const SettingsContext = createContext({
  rewards: undefined,
  socialLinks: undefined,
  menuTopLink: undefined,
  mobileMenuCta: undefined,
  menuItems: undefined,
} as SettingsSchemaType);

export const SettingsProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SettingsSchemaType;
}) => {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
