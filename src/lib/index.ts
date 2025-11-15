import type { ReactNode } from 'react';

export function sleep(n = 3_000) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

export function renderIf<T extends ReactNode>(
  condition: unknown,
  element: T | (() => T),
  fallback?: ReactNode | (() => ReactNode) | null,
) {
  if (!condition) {
    return fallback ? (typeof fallback === 'function' ? fallback() : fallback) : null;
  }
  return typeof element === 'function' ? element() : element;
}

export function getInitials(text: string) {
  if (!text.trim()) return '--';

  const [first, second] = text.trim().split(' ').filter(Boolean);

  if (first && !second) return first.charAt(0).toUpperCase() + first.charAt(1);

  return first.charAt(0).toUpperCase() + second.charAt(0).toUpperCase();
}
