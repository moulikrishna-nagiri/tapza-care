export type BackgroundKind = "color" | "gradient" | "image";

export type SectionBackground = {
  kind: BackgroundKind;
  value: string;
};

export type TabConfig = {
  id: string;
  label: string;
  icon: string;
  screen: string;
};

export type SectionConfig = {
  id: string;
  type: string;
  background: SectionBackground;
  title?: string;
  items: unknown[];
};

export type ThemeConfig = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;

  festival: {
    name: string;
    greeting: string;
    bannerImageUrl: string;
  };
};

export type LayoutConfig = {
  version: number;

  theme: ThemeConfig;

  tabs: TabConfig[];

  sections: SectionConfig[];
};

export type AppConfigVariant = 'normal' | 'festival';

export type HeroItem = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  imageUrl: string;
};

export type CategoryItem = {
  id: string;
  label: string;
  icon: string;
};

export type QuickActionItem = {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  action: string;
};

export type ServiceItem = {
  id: string;
  name: string;
  imageUrl: string;
  priceInr: number;
  badge?: string;
  description?: string;
};

export type OfferItem = {
  badge: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
};
