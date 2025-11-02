import { useForm } from '@tanstack/react-form';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Button } from 'shadcn/button';
import { Field, FieldError, FieldGroup, FieldLabel } from 'shadcn/field';
import { Input } from 'shadcn/input';
import { toast } from 'sonner';
import * as v from 'valibot';
import { ResetPasswordQueryParams, ResetPasswordSchema } from '~/features/auth/schemas';
import { sleep } from '~/lib';
import { getFieldProps, getSubmitHandler } from '~/lib/forms';

export const Route = createFileRoute('/(auth)/_layout/reset-password')({
  component: ResetPasswordPage,
  beforeLoad({ search }) {
    const result = v.safeParse(ResetPasswordQueryParams, search);
    if (!result.success) throw redirect({ to: '/login' });
  },
  loader({ location }) {
    return v.parse(ResetPasswordQueryParams, location.search);
  },
});

function ResetPasswordPage() {
  const data = Route.useLoaderData();

  const form = useForm({
    validators: {
      onBlur: ResetPasswordSchema,
      onChange: ResetPasswordSchema,
      onSubmit: ResetPasswordSchema,
    },
    defaultValues: {
      token: data.token,
      password: '',
      passwordConfirmation: '',
    },
    async onSubmit({ value }) {
      await sleep();
      const output = v.parse(ResetPasswordSchema, value);
      console.log('onSubmit:', output);
      toast.success('Form submitted successfully');
    },
  });

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="!mb-1">
          Set a new password for your <span>Peckr</span> account.
        </h1>
        <p className="text-muted-foreground">
          Change the password for your account with email: <br />
          <span className="font-semibold text-gray-600">{data.email}</span>
        </p>
      </div>

      <form onSubmit={getSubmitHandler(form)}>
        <FieldGroup>
          <form.Field name="password">
            {(field) => {
              const { isInvalid, fieldProps } = getFieldProps(field);
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input {...fieldProps} type="password" autoComplete="new-password" />
                  {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="passwordConfirmation">
            {(field) => {
              const { isInvalid, fieldProps } = getFieldProps(field);
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Repeat password</FieldLabel>
                  <Input {...fieldProps} type="password" autoComplete="new-password" />
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
              Change password
            </Button>
          )}
        </form.Subscribe>
      </form>
    </>
  );
}
