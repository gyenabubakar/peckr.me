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
  v.check(
    (subdomain) => !RESERVED_SUBDOMAINS.includes(subdomain as never),
    'This subdomain is reserved. Choose a different one',
  ),
  v.regex(
    SUBDOMAIN_REGEX,
    'Can only contain letters, numbers, and hyphens. Cannot start or end with a hyphen',
  ),
);

export const SubdomainFormSchema = v.object({
  subdomain: SubdomainSchema,
});
