export const PASSWORD_MIN_LENGTH = 8;

export const OTP_LENGTH = 6;

export const INVITABLE_ROLES = Object.freeze(['Admin', 'Member'] as const);
export type InvitableRole = (typeof INVITABLE_ROLES)[number];
