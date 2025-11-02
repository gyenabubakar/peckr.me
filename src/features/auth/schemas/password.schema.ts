import * as v from 'valibot';
import { PASSWORD_MIN_LENGTH } from '~/features/auth/constants';

export const PasswordSchema = v.pipe(
  v.string(),
  v.minLength(PASSWORD_MIN_LENGTH, 'At least 8 characters required.'),
);
