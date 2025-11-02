import { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link } from '@tanstack/react-router';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Button } from 'shadcn/button';
import { Field, FieldError, FieldGroup, FieldLabel } from 'shadcn/field';
import { Input } from 'shadcn/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from 'shadcn/input-otp';
import { cn } from 'shadcn/lib/utils';
import { toast } from 'sonner';
import { useCountdown } from 'usehooks-ts';
import { OTP_LENGTH } from '~/features/auth/constants';
import { EmailVerificationSchema, RegisterSchema } from '~/features/auth/schemas';
import { SocialAuthButtons } from '~/features/auth/ui';
import { sleep } from '~/lib';
import { getFieldProps, getSubmitHandler } from '~/lib/forms';

export const Route = createFileRoute('/(auth)/_layout/register')({
  component: RouteComponent,
});

function RouteComponent() {
  const [stage, setStage] = useState<'register' | 'verify'>('register');

  return (
    <main>
      {stage === 'register' ? <RegisterPage setStage={setStage} /> : <EmailVerification />}
    </main>
  );
}

interface RegisterPageProps {
  setStage: (stage: 'register' | 'verify') => void;
}

function RegisterPage({ setStage }: RegisterPageProps) {
  const form = useForm({
    validators: {
      onBlur: RegisterSchema,
      onChange: RegisterSchema,
      onSubmit: RegisterSchema,
    },
    defaultValues: {
      email: '',
      password: '',
    },
    async onSubmit({ value }) {
      await sleep();
      console.log('onSubmit:', value);
      toast.success('Form submitted successfully');
      setStage('verify');
    },
  });

  return (
    <>
      <h1>
        Create your <span>Peckr</span> account.
      </h1>

      <form onSubmit={getSubmitHandler(form)}>
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const { isInvalid, fieldProps } = getFieldProps(field);
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...fieldProps}
                    type="email"
                    placeholder="gyen@peckr.me"
                    autoComplete="off"
                  />
                  {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const { isInvalid, fieldProps } = getFieldProps(field);
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input {...fieldProps} type="password" autoComplete="off" />
                  {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              className="w-full mt-5"
              loading={isSubmitting}
              disabled={!canSubmit || isSubmitting}
            >
              Create account
            </Button>
          )}
        </form.Subscribe>
      </form>

      <SocialAuthButtons />

      <p data-do-other>
        Already have an account? <Link to="/login">Log in</Link>.{' '}
      </p>
    </>
  );
}

function EmailVerification() {
  const form = useForm({
    validators: {
      onBlur: EmailVerificationSchema,
      onChange: EmailVerificationSchema,
      onSubmit: EmailVerificationSchema,
    },
    defaultValues: {
      code: '',
    },
    async onSubmit({ value }) {
      await sleep();
      console.log('onSubmit:', value);
      toast.success('Form submitted successfully');
    },
  });

  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: 1_000,
  });

  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  function resendOTP() {
    if (count !== 0) return;

    console.log('resendOTP');
    resetCountdown();
    startCountdown();
  }

  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-xl font-semibold">Verify your email address.</h2>
        <p className="text-muted-foreground">
          Enter the six digit verification code sent to
          <br />
          <span className="font-medium text-gray-700">gyen@peckr.me</span>
        </p>
      </div>

      <form onSubmit={getSubmitHandler(form)}>
        <form.Field name="code">
          {(field) => {
            const { isInvalid } = getFieldProps(field);
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className="sr-only">
                  Code
                </FieldLabel>
                <div className="[&_[data-input-otp-container]]:justify-center">
                  <InputOTP
                    maxLength={OTP_LENGTH}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={field.state.value}
                    onChange={(v) => field.setValue(v)}
                  >
                    <InputOTPGroup>
                      {new Array(OTP_LENGTH).fill(0).map((_, index) => (
                        <InputOTPSlot key={index} index={index} className="w-16 h-16" />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              className="w-full mt-6"
              loading={isSubmitting}
              disabled={!canSubmit || isSubmitting}
            >
              Continue
            </Button>
          )}
        </form.Subscribe>

        <p data-do-other>
          Didn&apos;t receive a code?{' '}
          <button
            type="button"
            disabled={count !== 0}
            className={cn('disabled:cursor-not-allowed', count === 0 && 'text-primary')}
            onClick={resendOTP}
          >
            Resend {count !== 0 ? <span>({count}s)</span> : null}
          </button>
          .
        </p>
      </form>
    </>
  );
}
