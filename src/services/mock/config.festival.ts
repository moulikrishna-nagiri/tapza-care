import type { LayoutConfig } from "@/types/config";
import { normalConfig } from "./config.normal";

export const festivalConfig: LayoutConfig = {
  ...normalConfig,
  theme: {
    ...normalConfig.theme,
    primary: "#8B3A62",
    secondary: "#E88B8B",
    background: "#FFF8F4",
    textPrimary: "#3E2632",
    textSecondary: "#806D74",
    accent: "#E5A93D",
    festival: {
      name: "Diwali",
      greeting: "Happy Diwali, Mouli",
      bannerImageUrl:
        "https://images.unsplash.com/photo-1605633796033-0f3b0a2e5d2b?auto=format&fit=crop&w=1200&q=80",
    },
  },
  sections: [...normalConfig.sections]
    .reverse()
    .map((section) =>
      section.id === "header"
        ? {
            ...section,
            items: [
              {
                greeting: "Happy Diwali, Mouli",
                subtitle: "Your wellbeing, celebrated this season.",
              },
            ],
          }
        : section.id === "hero"
          ? {
              ...section,
              background: {
                kind: "image",
                value:
                  "https://images.unsplash.com/photo-1605633796033-0f3b0a2e5d2b?auto=format&fit=crop&w=1200&q=80",
              },
              items: [
                {
                  eyebrow: "DIWALI WELLNESS",
                  title: "Care that keeps you glowing",
                  subtitle:
                    "Get calm, practical support throughout the festive season.",
                  ctaLabel: "Find support",
                  imageUrl:
                    "https://images.unsplash.com/photo-1605633796033-0f3b0a2e5d2b?auto=format&fit=crop&w=1200&q=80",
                },
              ],
            }
          : section.id === "offer"
            ? {
                ...section,
                background: { kind: "color", value: "#8B3A62" },
                items: [
                  {
                    badge: "FESTIVE CARE",
                    title: "A little more care this Diwali",
                    subtitle: "Save 25% on your first online consultation.",
                    ctaLabel: "Book now",
                  },
                ],
              }
            : section,
    ),
};
