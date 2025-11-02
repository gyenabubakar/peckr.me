import { createFileRoute, Outlet } from '@tanstack/react-router';
import { LogOutIcon } from 'lucide-react';
import { Button } from 'shadcn/button';
import { WithTopGridBackground } from '~/features/onboarding/ui';

export const Route = createFileRoute('/app/(onboarding)/onboarding')({
  component: OnboardingLayout,
});

function OnboardingLayout() {
  return (
    <WithTopGridBackground>
      <div className="space-y-[150px]">
        <div className="w-full flex items-center justify-center py-4">
          <img src="/logo.svg" alt="Peckr logo" className="w-24" />
        </div>

        <div className="max-w-[400px] mx-auto [&_h1]:font-bold [&_h1]:text-2xl [&_h1]:text-center [&_h1]:mb-2 [&_h1>span]:text-primary [&_h1+p]:font-medium [&_h1+p]:text-center [&_h1+p]:text-muted-foreground">
          <Outlet />

          <div className="text-center mt-16">
            <Button variant="ghost">
              <LogOutIcon />
              Log out
            </Button>
          </div>
        </div>
      </div>
    </WithTopGridBackground>
  );
}
