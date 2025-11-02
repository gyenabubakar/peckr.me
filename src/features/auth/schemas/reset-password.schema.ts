import * as v from 'valibot';
import { EmailSchema } from './email.schema';
import { PasswordSchema } from './password.schema';

export const ResetPasswordQueryParams = v.object({
  email: EmailSchema,
  token: v.pipe(v.string(), v.trim(), v.minLength(1)),
});

export const ResetPasswordSchema = v.pipe(
  v.object({
    token: v.pipe(v.string(), v.trim(), v.minLength(1)),
    password: PasswordSchema,
    passwordConfirmation: PasswordSchema,
  }),
  v.forward(
    v.check((o) => o.password !== o.passwordConfirmation, 'Passwords do not match.'),
    ['passwordConfirmation'],
  ),
  v.transform((o) => ({
    newPassword: o.password,
    token: o.token,
  })),
);
