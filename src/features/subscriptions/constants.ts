import {
  Activity,
  BarChart3,
  Database,
  Globe,
  Headphones,
  Link2,
  MousePointerClick,
  Users,
  Zap,
} from 'lucide-react';
import type { PricingPlan } from './types';

export const PRICING_PLANS = Object.freeze([
  {
    name: 'FREE',
    price: {
      monthly: 0,
    },
    description: 'Perfect for individuals and side projects',
    features: [
      { icon: Link2, text: '100 links per month' },
      { icon: MousePointerClick, text: 'Unlimited clicks' },
      { icon: Globe, text: '1 custom subdomain' },
      { icon: BarChart3, text: '30-day analytics' },
      { icon: Activity, text: 'Real-time analytics' },
      { icon: Database, text: '1-month analytics retention' },
    ],
    cta: {
      text: 'Get Started Free',
      subtitle: 'No credit card required.',
    },
  },
  {
    name: 'PRO',
    badge: '⭐ Most Popular',
    price: {
      monthly: 19,
      annual: {
        monthly: 15,
        total: 180,
        savings: 'save 25%',
      },
    },
    description: 'For teams and power users',
    features: [
      { icon: Link2, text: 'Unlimited links & clicks' },
      { icon: Globe, text: '3 subdomains' },
      { icon: Database, text: '3-year analytics retention' },
      { icon: Zap, text: 'Edge redirects (10x faster)' },
      { icon: Users, text: 'Unlimited team members' },
      { icon: Headphones, text: 'Priority support' },
    ],
    cta: {
      text: 'Start 14-day Free Trial',
      subtitle: 'No credit card required.',
    },
  },
] satisfies PricingPlan[]);
