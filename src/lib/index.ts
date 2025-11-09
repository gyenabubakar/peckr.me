import type { ReactElement } from 'react';

export function sleep(n = 3_000) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

export function renderIf<T extends ReactElement>(
  condition: unknown,
  element: T | (() => T),
  fallback?: ReactElement | (() => ReactElement) | null,
) {
  if (!condition) {
    return fallback ? (typeof fallback === 'function' ? fallback() : fallback) : null;
  }
  return typeof element === 'function' ? element() : element;
}
