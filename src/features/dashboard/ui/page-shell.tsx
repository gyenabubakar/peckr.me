import type { ReactNode } from 'react';
import { renderIf } from '~/lib';

interface Props {
  leading: () => ReactNode;
  trailing?: () => ReactNode;
  children: ReactNode;
}

export function PageShell({ children, leading, trailing }: Props) {
  return (
    <>
      <header className="flex items-center justify-between py-2 px-6 border-b border-border">
        <div className="[&_span]:font-semibold [&_span]:text-xl">{leading()}</div>
        {renderIf(trailing, <div>{trailing!()}</div>)}
      </header>
      <section className="p-6">{children}</section>
    </>
  );
}
