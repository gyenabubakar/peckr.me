export function sleep(n = 3_000) {
  return new Promise((resolve) => setTimeout(resolve, n));
}
