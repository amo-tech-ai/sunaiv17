
import { IndustryPack } from "./packs/interfaces";
import { FASHION_PACK } from "./packs/fashion";
import { REAL_ESTATE_PACK } from "./packs/real_estate";
import { EVENTS_PACK } from "./packs/events";
import { SAAS_PACK } from "./packs/saas";
import { GENERIC_PACK } from "./packs/generic";
import { TOURISM_PACK } from "./packs/tourism";

export * from "./packs/interfaces";

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
