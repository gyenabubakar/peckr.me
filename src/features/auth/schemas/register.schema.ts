import * as v from 'valibot';
import { PasswordSchema } from './password.schema';

export const RegisterSchema = v.object({
  email: v.pipe(v.string(), v.trim(), v.email('Invalid email.')),
  password: PasswordSchema,
});
