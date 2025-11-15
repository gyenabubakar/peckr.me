import { createFileRoute } from '@tanstack/react-router';
import { ChevronsUpDownIcon, LinkIcon } from 'lucide-react';
import { Button } from 'shadcn/button';
import { PageShell } from '~/features/dashboard/ui';

export const Route = createFileRoute('/app/$slug/_space/')({
  component: SpaceDashboardIndex,
});

function SpaceDashboardIndex() {
  return (
    <PageShell
      leading={() => (
        <button className="p-0 flex items-center gap-2">
          <span>Links</span>
          <ChevronsUpDownIcon className="text-stone-400 size-4" />
        </button>
      )}
      trailing={() => (
        <Button>
          <LinkIcon />
          Create link
        </Button>
      )}
    >
      Hello World!
    </PageShell>
  );
}
