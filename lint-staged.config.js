export default {
  '*': (_files) => ['pnpm run format', 'pnpm run typecheck', 'pnpm run lint'],
};
