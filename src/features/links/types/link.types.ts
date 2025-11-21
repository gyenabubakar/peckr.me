export interface PeckrLinkAuthor {
  id: string;
  names: {
    first: string;
    last: string;
    other: string | null;
  };
  avatar: string | null;
}

export interface PeckrLink {
  id: string;
  shortLink: string;
  destinationUrl: string | null;
  favicon: string | null;
  tags: string[];
  clicks: number;
  createdAt: string;
  domain: string | null;
  author: PeckrLinkAuthor;
}
