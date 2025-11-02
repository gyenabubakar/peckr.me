// noinspection HtmlRequiredTitleElement

import { TanStackDevtools } from '@tanstack/react-devtools';
import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { Toaster } from 'shadcn/sonner';
import type { ReactNode } from 'react';
import type { QueryClient } from '@tanstack/react-query';
import ConvexProvider from '~/lib/convex/provider';
import TanStackQueryDevtools from '~/lib/tanstack-query/devtools';
import appCss from '~/styles.css?url';

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ConvexProvider>
          {children}

          <Toaster
            position="top-right"
            duration={7_000}
            visibleToasts={100}
            richColors
            closeButton
            expand
          />

          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        </ConvexProvider>
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Peckr',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: '',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&display=swap',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/logo.png',
      },
    ],
  }),

  shellComponent: RootDocument,
});

interface MyRouterContext {
  queryClient: QueryClient;
}
