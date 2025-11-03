import type { LucideIcon } from 'lucide-react';

export interface PricingFeature {
  icon: LucideIcon;
  text: string;
}

export interface PricingPlan {
  name: string;
  badge?: string;
  price: {
    monthly: number;
    annual?: {
      monthly: number;
      total: number;
      savings: string;
    };
  };
  description: string;
  features: PricingFeature[];
  cta: {
    text: string;
    subtitle: string;
  };
}
