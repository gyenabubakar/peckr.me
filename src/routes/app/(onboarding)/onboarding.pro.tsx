import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { ONBOARDING_PAGE_TRANSITION } from '~/features/onboarding/constants';
import { PricingCards } from '~/features/subscriptions/ui';

export const Route = createFileRoute('/app/(onboarding)/onboarding/pro')({
  component: ProPage,
});

function ProPage() {
  const navigate = useNavigate();

  return (
    <motion.main {...ONBOARDING_PAGE_TRANSITION}>
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-3">
          Choose your <span>Peckr</span> plan.
        </h1>
        <p className="text-muted-foreground">
          Select the perfect plan for your link management needs.
        </p>
      </div>

      <div className="max-w-[650px] mx-auto">
        <PricingCards
          onFreePlanClick={() => navigate({ to: '/app/onboarding/invitations' })}
          onProPlanClick={() => navigate({ to: '/app/onboarding/invitations' })}
        />
      </div>
    </motion.main>
  );
}
