import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/$slug/_org/')({
  component: OrganisationDashboardIndex,
});

function OrganisationDashboardIndex() {
  return <div>Hello "/app/$slug/_org/"!</div>;
}
