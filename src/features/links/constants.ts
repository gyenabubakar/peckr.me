import type { PeckrLink } from './types';

export const MOCK_LINKS: PeckrLink[] = [
  {
    id: '1',
    shortLink: 'asmobbin.link/star-keychain',
    destinationUrl:
      'amazon.com/Weicoca-Keychain-Keychains-Accessories-Fashionable/dp/B0DCP8VLGZ/ref=sr_1_14_ssp_1_14_ssp_1_14_ssp_1_14_ssp_1_14_ssp_1_14_ssp_1_14_ssp_1_14_ssp',
    favicon: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=64',
    tags: ['accessories'],
    clicks: 0,
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 mins ago
    domain: 'amazon.com',
    author: {
      id: 'user_1',
      names: {
        first: 'Gyen',
        last: 'Abubakar',
        other: null,
      },
      avatar: null,
    },
  },
  {
    id: '2',
    shortLink: 'asmobbin.link',
    destinationUrl: null,
    favicon: null,
    tags: [],
    clicks: 35,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    domain: 'asmobbin.link',
    author: {
      id: 'user_1',
      names: {
        first: 'Gyen',
        last: 'Abubakar',
        other: null,
      },
      avatar: null,
    },
  },
  {
    id: '3',
    shortLink: 'content-mobbin.com',
    destinationUrl: null,
    favicon: null,
    tags: [],
    clicks: 0,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    domain: 'content-mobbin.com',
    author: {
      id: 'user_1',
      names: {
        first: 'Gyen',
        last: 'Abubakar',
        other: null,
      },
      avatar: null,
    },
  },
];
