import * as v from 'valibot';
import { PasswordSchema } from './password.schema';

export const LoginSchema = v.object({
  email: v.pipe(v.string(), v.trim(), v.email('Invalid email.')),
  password: PasswordSchema,
});
