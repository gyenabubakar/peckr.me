import { cn } from 'shadcn/lib/utils';
import type { ReactNode } from 'react';
import type { ClassValue } from 'clsx';

interface Props {
  children?: ReactNode;
  className?: ClassValue;
}

export function WithDotsBackground({ children = null, className }: Props) {
  return (
    <div className={cn('w-full bg-white relative', className)}>
      {/* Noise Texture (Darker Dots) Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: '#ffffff',
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />
      {children}
    </div>
  );
}

// Copied from: https://patterncraft.fun/
