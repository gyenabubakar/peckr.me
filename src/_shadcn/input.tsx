import * as React from 'react';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from 'shadcn/lib/utils';
import { SimpleTooltip } from '~/components';

interface Props extends React.ComponentProps<'input'> {
  canToggleVisibility?: boolean;
}

function Input({ className, type, canToggleVisibility = true, ...props }: Props) {
  const [revealed, setRevealed] = useState(false);

  const inputType = (() => {
    if (type !== 'password') return type;
    if (!canToggleVisibility) return 'password';
    return revealed ? 'text' : 'password';
  })();

  return (
    <div className="relative">
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          'bg-white file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          inputType === 'password' && 'font-serif',
          className,
        )}
        {...props}
      />

      {type === 'password' && canToggleVisibility ? (
        <SimpleTooltip title={`${revealed ? 'Hide' : 'Show'} password`}>
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? 'Hide password' : 'Show password'}
          >
            {revealed ? <EyeOffIcon strokeWidth={1.2} /> : <EyeIcon strokeWidth={1.2} />}
          </button>
        </SimpleTooltip>
      ) : null}
    </div>
  );
}

export { Input };
