import * as v from 'valibot';

const SUBDOMAIN_REGEX = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;

const RESERVED_SUBDOMAINS = [
  'www',
  'api',
  'admin',
  'app',
  'mail',
  'ftp',
  'localhost',
  'staging',
  'dev',
  'production',
  'prod',
  'test',
  'demo',
  'beta',
  'alpha',
  'cdn',
  'assets',
  'static',
  'media',
  'images',
  'img',
  'blog',
  'forum',
  'shop',
  'store',
  'support',
  'help',
  'docs',
  'status',
  'monitor',
  'dashboard',
] as const;

const SubdomainSchema = v.pipe(
  v.string(),
  v.trim(),
  v.toLowerCase(),
  v.minLength(3, 'Must be at least 3 characters'),
  v.maxLength(63, 'Must be 63 characters or less'),
  v.regex(/^[a-z0-9-]+$/, 'Can only contain letters, numbers, and hyphens'),
  v.check((subdomain) => !subdomain.startsWith('-'), 'Cannot start with a hyphen'),
  v.check((subdomain) => !subdomain.endsWith('-'), 'Cannot end with a hyphen'),
  v.check(
    (subdomain) => !RESERVED_SUBDOMAINS.includes(subdomain as never),
    'This subdomain is reserved. Choose a different one',
  ),
  v.regex(SUBDOMAIN_REGEX, 'Invalid subdomain (e.g., my-company, acme-corp)'),
);

export const SubdomainFormSchema = v.object({
  subdomain: SubdomainSchema,
});
