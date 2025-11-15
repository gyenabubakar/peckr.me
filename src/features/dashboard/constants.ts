import {
  ChartNoAxesColumnIcon,
  FolderIcon,
  GlobeIcon,
  LinkIcon,
  MousePointerClickIcon,
  SquareArrowOutUpRightIcon,
  TagIcon,
  UserRoundIcon,
} from 'lucide-react';

export const NAV_LINK_GROUPS = [
  {
    group: '',
    items: [
      {
        text: 'Links',
        path: '/' as const,
        icon: LinkIcon,
      },
      {
        text: 'Domains',
        path: '/domains' as const,
        icon: GlobeIcon,
      },
    ],
  },
  {
    group: 'Insights',
    items: [
      {
        text: 'Analytics',
        path: '/analytics' as const,
        icon: ChartNoAxesColumnIcon,
      },
      {
        text: 'Events',
        path: '/events' as const,
        icon: MousePointerClickIcon,
      },
      {
        text: 'Customers',
        path: '/customers' as const,
        icon: UserRoundIcon,
      },
    ],
  },
  {
    group: 'Library',
    items: [
      {
        text: 'Folders',
        path: '/folders' as const,
        icon: FolderIcon,
      },
      {
        text: 'Tags',
        path: '/tags' as const,
        icon: TagIcon,
      },
      {
        text: 'UTM Templates',
        path: '/utm-templates' as const,
        icon: SquareArrowOutUpRightIcon,
      },
    ],
  },
];
