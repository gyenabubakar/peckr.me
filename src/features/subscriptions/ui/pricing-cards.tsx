import { Badge } from 'shadcn/badge';
import { Button } from 'shadcn/button';
import { cn } from 'shadcn/lib/utils';
import { PRICING_PLANS } from '../constants';
import type { PricingPlan } from '../types';

interface PricingCardsProps {
  onFreePlanClick?: () => void;
  onProPlanClick?: () => void;
}

export function PricingCards({ onFreePlanClick, onProPlanClick }: PricingCardsProps) {
  return (
    <div className="flex max-w-7xl mx-auto">
      <PricingCard plan={PRICING_PLANS[0]} position="left" onClick={onFreePlanClick} />
      <PricingCard plan={PRICING_PLANS[1]} position="right" onClick={onProPlanClick} />
    </div>
  );
}

interface PricingCardProps {
  plan: PricingPlan;
  position?: 'left' | 'right';
  onClick?: () => void;
}

function PricingCard({ plan, position = 'left', onClick }: PricingCardProps) {
  const isLeft = position === 'left';
  const isRight = position === 'right';
  const isPro = plan.price.monthly > 0;

  return (
    <div
      className={cn(
        'flex-1 border border-border p-8 flex flex-col relative overflow-hidden',
        isLeft && 'rounded-l-xl border-r-0 bg-background',
        isRight && 'rounded-r-xl',
      )}
      style={
        isPro
          ? {
              background:
                'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(236,72,153,0.18) 0%, rgba(168,85,247,0.12) 30%, white 60%)',
            }
          : undefined
      }
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          {plan.badge ? (
            <Badge variant="default" className="text-xs">
              {plan.badge}
            </Badge>
          ) : null}
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">${plan.price.monthly}</span>
            <span className="text-muted-foreground">
              /month{plan.price.monthly === 0 ? ' forever' : ''}
            </span>
          </div>
          {plan.price.annual ? (
            <p className="text-sm text-muted-foreground mt-1">
              or ${plan.price.annual.monthly}/month billed annually ({plan.price.annual.savings})
            </p>
          ) : null}
        </div>

        {/* Description */}
        <p className="text-muted-foreground">{plan.description}</p>
      </div>

      {/* Features */}
      <div className="mb-8 flex-1">
        {plan.price.monthly > 0 ? (
          <p className="text-sm font-medium mb-3">Everything in Free, plus:</p>
        ) : null}
        <ul className="space-y-3">
          {plan.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <li key={index} className="flex items-center gap-3">
                <Icon className="size-5 text-primary shrink-0" strokeWidth={1.5} />
                <span className="text-sm">{feature.text}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* CTA */}
      <div>
        <Button
          className="w-full mb-2"
          variant={plan.price.monthly > 0 ? 'default' : 'outline'}
          size="lg"
          onClick={onClick}
        >
          {plan.cta.text}
        </Button>
        <p className="text-xs text-center text-muted-foreground">{plan.cta.subtitle}</p>
      </div>
    </div>
  );
}
