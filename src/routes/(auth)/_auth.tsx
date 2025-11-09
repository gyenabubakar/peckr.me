import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { WithDotsBackground } from '~/features/auth/ui';

export const Route = createFileRoute('/(auth)/_auth')({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <WithDotsBackground className="w-screen h-screen">
      <div className="space-y-[200px]">
        <div className="w-full flex items-center justify-center py-4">
          <Link to="/">
            <img src="/logo.svg" alt="Peckr logo" className="w-24" />
          </Link>
        </div>

        <div className="w-[400px] mx-auto [&_h1]:font-bold [&_h1]:text-2xl [&_h1]:text-center [&_h1]:mb-7 [&_h1>span]:text-primary [&_[data-do-other]]:font-semibold [&_[data-do-other]]:text-center [&_[data-do-other]]:mt-6 [&_[data-do-other]]:text-muted-foreground [&_[data-do-other]_a]:text-primary [&_[data-do-other]_a]:underline">
          <Outlet />
        </div>
      </div>
    </WithDotsBackground>
  );
}
