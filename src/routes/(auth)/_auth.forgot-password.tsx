import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from 'shadcn/button';
import { Field, FieldError, FieldGroup, FieldLabel } from 'shadcn/field';
import { Input } from 'shadcn/input';
import { toast } from 'sonner';
import { ForgotPasswordSchema } from '~/features/auth/schemas';
import { renderIf, sleep } from '~/lib';
import { getFieldProps, getSubmitHandler } from '~/lib/forms';

export const Route = createFileRoute('/(auth)/_auth/forgot-password')({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const form = useForm({
    validators: {
      onBlur: ForgotPasswordSchema,
      onChange: ForgotPasswordSchema,
      onSubmit: ForgotPasswordSchema,
    },
    defaultValues: {
      email: '',
    },
    async onSubmit({ value }) {
      await sleep();
      console.log('onSubmit:', value);
      toast.success('Form submitted successfully');
    },
  });

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="!mb-1">
          Reset your <span>Peckr</span> account password.
        </h1>
        <p className="text-muted-foreground">
          If your email is associated with an account, we will send you a link to change your
          password.
        </p>
      </div>

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
        </FieldGroup>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              className="w-full mt-5"
              loading={isSubmitting}
              disabled={!canSubmit || isSubmitting}
            >
              Send link
            </Button>
          )}
        </form.Subscribe>
      </form>

      <p data-do-other>
        Remembered your password? <Link to="/login">Log in</Link>.
      </p>
    </>
  );
}
