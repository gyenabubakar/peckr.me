import { createFileRoute } from '@tanstack/react-router';
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  EllipsisVerticalIcon,
  LinkIcon,
  ListFilterIcon,
  SearchIcon,
  Settings2Icon,
} from 'lucide-react';
import { Button } from 'shadcn/button';
import { Input } from 'shadcn/input';
import { PageShell } from '~/features/dashboard/ui';
import { EmptyState } from '~/features/links/ui';

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
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2">
          <Button variant="outline">
            <ListFilterIcon />
            Filter
            <ChevronDownIcon className="text-muted-foreground" />
          </Button>
          <Button variant="outline">
            <Settings2Icon />
            Display
            <ChevronDownIcon className="text-muted-foreground" />
          </Button>
        </div>

        <div className="flex gap-2">
          <div className="relative w-max h-max">
            <Input className="pl-7 w-60" placeholder="Search by short link or URL " />
            <SearchIcon className="absolute size-4 left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>

          <Button variant="outline" size="icon">
            <EllipsisVerticalIcon />
          </Button>
        </div>
      </div>

      <EmptyState />
    </PageShell>
  );
}
