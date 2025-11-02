import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from 'shadcn/button';
import { Field, FieldError, FieldGroup, FieldLabel } from 'shadcn/field';
import { Input } from 'shadcn/input';
import { toast } from 'sonner';
import { RegisterSchema } from '~/features/auth/schemas';
import { SocialAuthButtons } from '~/features/auth/ui';
import { getFieldProps, getSubmitHandler } from '~/lib/forms';

export const Route = createFileRoute('/(auth)/_layout/register')({
  component: RegisterPage,
});

function RegisterPage() {
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
    onSubmit({ value }) {
      console.log('onSubmit:', value);
      toast.success('Form submitted successfully');
    },
  });

  return (
    <main className="">
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

        <Button className="w-full mt-5">Create account</Button>
      </form>

      <SocialAuthButtons />

      <p data-do-other>
        Already have an account? <Link to="/login">Log in</Link>.{' '}
      </p>
    </main>
  );
}
