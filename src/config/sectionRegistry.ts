import type { ComponentType } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { SectionConfig } from '@/types/config';

import { CategoryChips } from '@/features/home/components/CategoryChips';
import { DoctorCarousel } from '@/features/home/components/DoctorCarousel';
import { HeroBanner } from '@/features/home/components/HeroBanner';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { OfferStrip } from '@/features/home/components/OfferStrip';
import { QuickActions } from '@/features/home/components/QuickActions';
import { ServiceGrid } from '@/features/home/components/ServiceGrid';

export type SectionRendererProps = { section: SectionConfig; scrollY: SharedValue<number>; onAction: (action?: string) => void };
export const sectionRegistry: Record<string, ComponentType<SectionRendererProps>> = {
  header: HomeHeader as ComponentType<SectionRendererProps>,
  hero_banner: HeroBanner as ComponentType<SectionRendererProps>,
  category_chips: CategoryChips as ComponentType<SectionRendererProps>,
  quick_actions: QuickActions as ComponentType<SectionRendererProps>,
  service_grid: ServiceGrid as ComponentType<SectionRendererProps>,
  doctor_carousel: DoctorCarousel as ComponentType<SectionRendererProps>,
  offer_strip: OfferStrip as ComponentType<SectionRendererProps>,
};
