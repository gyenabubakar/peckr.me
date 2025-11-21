import {
  CopyIcon,
  CornerDownRightIcon,
  FileTextIcon,
  GlobeIcon,
  MoreVerticalIcon,
  MousePointerClickIcon,
  TagIcon,
  ZapIcon,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from 'shadcn/avatar';
import { Badge } from 'shadcn/badge';
import { Button } from 'shadcn/button';
import { formatTimeAgo, getInitials, renderIf } from '~/lib';
import type { PeckrLink } from '~/features/links/types';

export interface LinkItemProps {
  link: PeckrLink;
}

export function LinkItem({ link }: LinkItemProps) {
  const { shortLink, destinationUrl, favicon, tags = [], clicks, createdAt, domain, author } = link;

  return (
    <div className="flex items-center justify-between overflow-hidden rounded-lg border border-border gap-12 bg-background p-4 transition-shadow hover:shadow-sm">
      <div className="min-w-0 flex flex-1 items-center gap-4">
        <Avatar className="size-10 border border-border flex items-center justify-center">
          <AvatarImage src={favicon} alt={domain} className="size-6" />
          <AvatarFallback>
            <GlobeIcon className="size-5 text-gray-700" />
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-4">
            <div className="min-w-0 shrink">
              <span className="block truncate font-semibold">{shortLink}</span>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <button className="size-4 hover:text-primary">
                <CopyIcon className="size-3.5" />
              </button>
              {renderIf(
                destinationUrl,
                <>
                  <button className="size-4 hover:text-primary">
                    <ZapIcon className="size-3.5" />
                  </button>
                  <button className="size-4 hover:text-primary">
                    <FileTextIcon className="size-3.5" />
                  </button>
                </>,
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <CornerDownRightIcon className="size-3 shrink-0" />
            <div className="min-w-0 shrink">
              {destinationUrl ? (
                <span className="block truncate">{destinationUrl}</span>
              ) : (
                <span>No URL configured</span>
              )}
            </div>

            <div className="ml-2 flex shrink-0 items-center gap-2">
              <Avatar className="size-5">
                <AvatarImage
                  src={author.avatar}
                  alt={`${author.names.first} ${author.names.last}`}
                />
                <AvatarFallback className="bg-green-100 text-[10px] text-green-700">
                  {getInitials(`${author.names.first} ${author.names.last}`)}
                </AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground text-sm">{formatTimeAgo(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {tags.map((tag) => (
          <Badge key={tag} variant="primary" size="md">
            <TagIcon className="size-3" />
            {tag}
          </Badge>
        ))}

        <Badge variant="secondary" size="md">
          <MousePointerClickIcon className="size-3" />
          {clicks} clicks
        </Badge>

        <Button variant="ghost" size="icon">
          <MoreVerticalIcon className="size-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
