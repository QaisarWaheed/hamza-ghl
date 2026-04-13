export const CATEGORIES = ["FUNNELS", "WEBSITES", "AUTOMATIONS", "CRM_SYSTEMS"] as const;

export type PortfolioCategoryKey = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<PortfolioCategoryKey, string> = {
  FUNNELS: "Funnels",
  WEBSITES: "Websites",
  AUTOMATIONS: "Automations",
  CRM_SYSTEMS: "CRM Systems",
};

export const CATEGORY_ORDER = [...CATEGORIES];
