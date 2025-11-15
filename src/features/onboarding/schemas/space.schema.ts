import * as v from 'valibot';

export const SpaceSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(3, 'At least 3 characters required.')),
  slug: v.pipe(v.string(), v.trim(), v.minLength(3, 'At least 3 characters required.')),
  logo: v.pipe(
    v.nullable(v.file()),
    v.check((f) => !f || f.size <= 3_000_000 /* 3MB */, 'File size exceeds 3MB limit.'),
  ),
});

export type SpaceSchemaInput = v.InferInput<typeof SpaceSchema>;

export const SpaceTransformedSchema = v.pipe(
  SpaceSchema,
  v.transform((s) => {
    const formData = new FormData();

    formData.set('name', s.name);
    formData.set('slug', s.slug);
    if (s.logo) formData.set('logo', s.logo);

    return formData;
  }),
);
