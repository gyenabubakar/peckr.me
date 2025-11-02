import { Tooltip, TooltipContent, TooltipTrigger } from 'shadcn/tooltip';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export function SimpleTooltip({ children, title }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
}
