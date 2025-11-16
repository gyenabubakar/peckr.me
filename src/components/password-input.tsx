import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input } from 'shadcn/input';
import { cn } from 'shadcn/lib/utils';
import type { ComponentProps } from 'react';
import type { ClassValue } from 'clsx';
import { SimpleTooltip } from './simple-tooltip';

interface Props extends Omit<ComponentProps<'input'>, 'type'> {
  wrapperClass?: ClassValue;
}

export function PasswordInput({ className, wrapperClass, ...props }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={cn('relative', wrapperClass)}>
      <Input
        {...props}
        className={cn('pr-9', !revealed && 'font-serif', className)}
        type={revealed ? 'text' : 'password'}
      />

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
    </div>
  );
}
