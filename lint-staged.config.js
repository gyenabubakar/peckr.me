export default {
  '*': (_files) => ['pnpm run typecheck', 'pnpm run format', 'pnpm run lint'],
};
