import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/app/$slug/_org')({
  component: OrganisationDashboardLayout,
});

function OrganisationDashboardLayout() {
  return (
    <div className="text-black">
      <p className="text-red-500">From layout!</p>
      <Outlet />
    </div>
  );
}
