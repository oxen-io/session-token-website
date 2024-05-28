'use client';

import type { SettingsSchemaType } from '@/schemas/singletons/settings';
import { createContext, type ReactNode } from 'react';

export const SettingsContext = createContext({
  menuTopLink: undefined,
  mobileMenuCta: undefined,
  menuItems: undefined,
  ogImage: undefined,
  shareModal: undefined,
  socialLinks: undefined,
  rewards: undefined,
} as unknown as SettingsSchemaType);

export const SettingsProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: SettingsSchemaType;
}) => {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
