import * as v from 'valibot';
import { OTP_LENGTH } from '~/features/auth/constants';

export const EmailVerificationSchema = v.object({
  code: v.pipe(v.string(), v.minLength(OTP_LENGTH, 'Invalid OTP.')),
});
