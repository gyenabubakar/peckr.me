import * as v from 'valibot';
import { INVITABLE_ROLES } from '~/features/auth/constants';
import { EmailSchema } from '~/features/auth/schemas';

const InviteSchema = v.object({
  id: v.pipe(v.string(), v.uuid()),
  email: v.union([EmailSchema, v.pipe(v.string(), v.trim(), v.maxLength(0))]),
  role: v.picklist(INVITABLE_ROLES),
});

export type InviteSchemaInput = v.InferInput<typeof InviteSchema>;

export const InvitationsSchema = v.object({
  invites: v.pipe(
    v.array(InviteSchema),
    v.transform((o) => o.filter((i) => !!i.email)),
  ),
});
