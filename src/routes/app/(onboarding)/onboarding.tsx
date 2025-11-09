import { useEffect } from 'react';
import { createFileRoute, Outlet, useLocation, useRouter } from '@tanstack/react-router';
import { LogOutIcon } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { Button } from 'shadcn/button';
import { cn } from 'shadcn/lib/utils';
import { WithTopGridBackground } from '~/features/onboarding/ui';

export const Route = createFileRoute('/app/(onboarding)/onboarding')({
  component: OnboardingLayout,
});

function OnboardingLayout() {
  const pathname = useLocation({ select: (l) => l.pathname });
  const router = useRouter();

  useEffect(() => {
    void Promise.allSettled([
      router.loadRouteChunk(router.routesByPath['/app/onboarding/']),
      router.loadRouteChunk(router.routesByPath['/app/onboarding/pro']),
      router.loadRouteChunk(router.routesByPath['/app/onboarding/invitations']),
    ]);
  }, [router]);

  return (
    <WithTopGridBackground>
      <div className="space-y-[150px] pb-32">
        <div className="w-full flex items-center justify-center py-4">
          <img src="/logo.svg" alt="Peckr logo" className="w-24" />
        </div>

        <div
          className={cn(
            'mx-auto [&_h1]:font-bold [&_h1]:text-2xl [&_h1]:text-center [&_h1]:mb-2 [&_h1>span]:text-primary [&_h1+p]:font-medium [&_h1+p]:text-center [&_h1+p]:text-muted-foreground',
            pathname !== '/app/onboarding/pro' && 'max-w-[400px]',
          )}
        >
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>

          <div className="text-center mt-16 space-y-2">
            <p className="text-sm text-muted-foreground">
              Signed in as <span className="font-semibold text-gray-700">gyen@peckr.me</span>.
            </p>
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
