import * as v from 'valibot';
import { EmailSchema } from './email.schema';

export const ForgotPasswordSchema = v.object({
  email: EmailSchema,
});
