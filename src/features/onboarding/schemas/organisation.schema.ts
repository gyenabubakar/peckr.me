import * as v from 'valibot';

export const OrganisationSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(3, 'At least 3 characters required.')),
  slug: v.pipe(v.string(), v.trim(), v.minLength(3, 'At least 3 characters required.')),
  logo: v.pipe(
    v.nullable(v.file()),
    v.check((f) => !f || f.size <= 3_000_000 /* 3MB */, 'File size exceeds 3MB limit.'),
  ),
});

export type OrganisationSchemaInput = v.InferInput<typeof OrganisationSchema>;

export const OrganisationTransformedSchema = v.pipe(
  OrganisationSchema,
  v.transform((o) => {
    const formData = new FormData();

    formData.set('name', o.name);
    formData.set('slug', o.slug);
    if (o.logo) formData.set('logo', o.logo);

    return formData;
  }),
);
