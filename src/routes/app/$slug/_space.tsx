import { createFileRoute, Link, Outlet, useRouter } from '@tanstack/react-router';
import { Avatar, AvatarFallback, AvatarImage } from 'shadcn/avatar';
import { cn } from 'shadcn/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from 'shadcn/sidebar';
import type { CSSProperties } from 'react';
import { NAV_LINK_GROUPS } from '~/features/dashboard/constants';
import { getInitials, renderIf } from '~/lib';

export const Route = createFileRoute('/app/$slug/_space')({
  component: SpaceDashboardLayout,
});

function SpaceDashboardLayout() {
  const { slug } = Route.useParams();
  const router = useRouter();

  return (
    <SidebarProvider data-space-layout className="text-black">
      <div
        className="w-svw h-svh"
        style={
          { '--sidebar-full-width': 'calc(var(--sidebar-width) + 42px + 8px)' } as CSSProperties
        }
      >
        <Sidebar
          className="border-r-0! **:data-[slot=sidebar-inner]:bg-transparent!"
          style={{ width: `calc(var(--sidebar-width) + 41.5px)` } as CSSProperties}
        >
          <div className="flex h-full">
            <div
              data-name="app-rail"
              className="flex flex-col h-full items-center justify-between py-5 px-2.5 bg-transparent"
            >
              <div data-name="navigation" className="flex flex-col space-y-6">
                <img src="/favicon.svg" alt="Peckr.me logo" className="w-10" />

                <div className="flex flex-col justify-center items-center gap-3">
                  {FAKE_SPACES.map((space) => (
                    <button
                      key={space.id}
                      className="relative group/space-button"
                      onClick={() =>
                        router.navigate({ to: '/app/$slug', params: { slug: space.slug } })
                      }
                    >
                      <div
                        data-name="active-space-indicator"
                        className={cn(
                          'w-[5px] bg-primary absolute -left-2.5 top-1/2 -translate-y-1/2 rounded-r-md transition-all duration-200',
                          slug === space.slug
                            ? 'h-full opacity-100'
                            : 'h-1/2 opacity-0 group-hover/space-button:opacity-100',
                        )}
                      />
                      <Avatar
                        className={cn(
                          'size-10 rounded-md',
                          slug === space.slug && '*:rounded-full *:transition-all',
                        )}
                      >
                        <AvatarImage src={space.logo} alt={space.name} />
                        <AvatarFallback className="rounded-md">
                          {getInitials(space.name)}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  ))}
                </div>
              </div>

              <div data-name="account" className="">
                {/* TODO: Replace the hardcoded name with real data after implementing auth */}
                <Avatar className="size-10">
                  <AvatarImage src="" alt="John Doe's avatar" />
                  <AvatarFallback className="rounded-md">{getInitials('John Doe')}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="w-(--sidebar-width) py-2 h-full">
              <SidebarContent className="w-full! h-full bg-stone-100 rounded-md py-4 px-2.5">
                <div className="flex flex-col space-y-6">
                  <span className="text-[22px] font-semibold px-3.5">Short Links</span>

                  <div className="space-y-5">
                    {NAV_LINK_GROUPS.map(({ group, items }) => (
                      <SidebarGroup key={group} className="p-0">
                        {renderIf(
                          group,
                          <SidebarGroupLabel className="text-sm ml-2 text-stone-400">
                            {group}
                          </SidebarGroupLabel>,
                        )}

                        <SidebarGroupContent>
                          <SidebarMenu className="gap-0">
                            {items.map((item) => (
                              <SidebarMenuItem key={item.text}>
                                <SidebarMenuButton asChild>
                                  <Link
                                    to={'/app/$slug' + item.path}
                                    params={{ slug }}
                                    className="text-stone-600 font-medium hover:bg-stone-200"
                                    preload="intent"
                                  >
                                    <item.icon />
                                    <span className="text-sm">{item.text}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    ))}
                  </div>
                </div>
              </SidebarContent>
            </div>
          </div>
        </Sidebar>

        <div className="ml-(--sidebar-full-width) py-2 pr-2">
          <main className="bg-white rounded-md min-h-svh">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

const FAKE_SPACES = [
  {
    id: '1',
    name: 'Acme Corp',
    slug: 'acme',
    logo: 'https://picsum.photos/seed/acme/200',
  },
  {
    id: '2',
    name: 'TechStart Inc',
    slug: 'techstart',
    logo: 'https://picsum.photos/seed/techstart/200',
  },
  {
    id: '3',
    name: 'Creative Studio',
    slug: 'creative',
    logo: null,
  },
];
