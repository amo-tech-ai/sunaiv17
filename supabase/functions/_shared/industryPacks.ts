
import { IndustryPack } from "./packs/interfaces.ts";
import { FASHION_PACK } from "./packs/fashion.ts";
import { REAL_ESTATE_PACK } from "./packs/real_estate.ts";
import { EVENTS_PACK } from "./packs/events.ts";
import { SAAS_PACK } from "./packs/saas.ts";
import { GENERIC_PACK, TOURISM_PACK } from "./packs/generic.ts";

export * from "./packs/interfaces.ts";

export const INDUSTRY_PACKS: Record<string, IndustryPack> = {
  'fashion': FASHION_PACK,
  'real_estate': REAL_ESTATE_PACK,
  'tourism': TOURISM_PACK,
  'saas': SAAS_PACK,
  'events': EVENTS_PACK,
  'other': GENERIC_PACK
};

export const getIndustryPack = (industry: string): IndustryPack => {
  const keys = Object.keys(INDUSTRY_PACKS);
  const matched = keys.find(k => k === industry.toLowerCase()) || 'other';
  return INDUSTRY_PACKS[matched];
};
