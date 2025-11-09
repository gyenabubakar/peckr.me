import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from 'shadcn/button';
import { Field, FieldError, FieldGroup, FieldLabel } from 'shadcn/field';
import { Input } from 'shadcn/input';
import { toast } from 'sonner';
import { LoginSchema } from '~/features/auth/schemas';
import { SocialAuthButtons } from '~/features/auth/ui';
import { renderIf, sleep } from '~/lib';
import { getFieldProps, getSubmitHandler } from '~/lib/forms';

export const Route = createFileRoute('/(auth)/_auth/login')({
  component: LoginPage,
});

function LoginPage() {
  const form = useForm({
    validators: {
      onBlur: LoginSchema,
      onChange: LoginSchema,
      onSubmit: LoginSchema,
    },
    defaultValues: {
      email: '',
      password: '',
    },
    async onSubmit({ value }) {
      await sleep();
      console.log('onSubmit:', value);
      toast.success('Form submitted successfully');
    },
  });

  return (
    <>
      <h1>
        Log in to your <span>Peckr</span> account.
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
                    autoComplete="email"
                  />
                  {renderIf(isInvalid, <FieldError errors={field.state.meta.errors} />)}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const { isInvalid, fieldProps } = getFieldProps(field);
              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Link to="/forgot-password" className="text-sm">
                      Forgot password?
                    </Link>
                  </div>

                  <Input {...fieldProps} type="password" autoComplete="current-password" />
                  {renderIf(isInvalid, <FieldError errors={field.state.meta.errors} />)}
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
              Log in
            </Button>
          )}
        </form.Subscribe>
      </form>

      <SocialAuthButtons />

      <p data-do-other>
        Don't have an account? <Link to="/register">Sign up</Link>.
      </p>
    </>
  );
}
