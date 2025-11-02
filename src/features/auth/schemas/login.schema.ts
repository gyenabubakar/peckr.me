import * as v from 'valibot';
import { EmailSchema } from './email.schema';
import { PasswordSchema } from './password.schema';

export const LoginSchema = v.object({
  email: EmailSchema,
  password: PasswordSchema,
});
