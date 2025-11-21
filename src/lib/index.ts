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

export function formatTimeAgo(dateString: string): string {
  const now = Date.now();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  if (diffInSeconds < 3_600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86_400) return `${Math.floor(diffInSeconds / 3_600)}h`;
  if (diffInSeconds < 604_800) return `${Math.floor(diffInSeconds / 86_400)}d`;
  if (diffInSeconds < 2_592_000) return `${Math.floor(diffInSeconds / 604_800)}w`;
  if (diffInSeconds < 31_536_000) return `${Math.floor(diffInSeconds / 2_592_000)}mo`;

  return `${Math.floor(diffInSeconds / 31_536_000)}y`;
}
