import { useForm } from '@tanstack/react-form';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { Button } from 'shadcn/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from 'shadcn/field';
import { Input } from 'shadcn/input';
import { toast } from 'sonner';
import { ONBOARDING_PAGE_TRANSITION } from '~/features/onboarding/constants';
import { SubdomainFormSchema } from '~/features/onboarding/schemas';
import { ProRequiredBadge } from '~/features/onboarding/ui';
import { renderIf, sleep } from '~/lib';
import { getFieldProps, getSubmitHandler } from '~/lib/forms';

export const Route = createFileRoute('/onboarding/_onboarding/subdomain')({
  component: SubDomainPage,
});

function SubDomainPage() {
  const router = useRouter();
  const form = useForm({
    validators: {
      onBlur: SubdomainFormSchema,
      onChange: SubdomainFormSchema,
      onSubmit: SubdomainFormSchema,
    },
    defaultValues: {
      subdomain: '',
    },
    async onSubmit({ value }) {
      await sleep();
      console.log('onSubmit:', value);
      toast.success('Form submitted successfully');
      router.navigate({ to: '/onboarding/invitations' });
    },
  });

  return (
    <motion.main {...ONBOARDING_PAGE_TRANSITION}>
      <div className="mb-8">
        <ProRequiredBadge />

        <h1>
          Pick a subdomain for your <span className="text-primary">Peckr</span> space.
        </h1>
        <p>
          Choose a subdomain that makes it easy for your team to identify your space. In the future,
          you'll be able to add a custom domain to boost trust.
        </p>
      </div>

      <form onSubmit={getSubmitHandler(form)}>
        <FieldGroup>
          <form.Field name="subdomain">
            {(field) => {
              const { isInvalid, fieldProps } = getFieldProps(field);
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Subdomain</FieldLabel>
                  <FieldDescription className="text-xs">
                    You can delete or add new subdomains after onboarding.
                  </FieldDescription>

                  <div className="relative w-full flex">
                    <Input {...fieldProps} className="rounded-r-none" wrapperClass="grow" />
                    <div className="bg-gray-50 px-2.5 border-y border-r rounded-r-md border-border flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">.peckr.me</span>
                    </div>
                  </div>

                  {renderIf(isInvalid, <FieldError errors={field.state.meta.errors.slice(0, 1)} />)}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        <div className="space-y-3">
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                className="w-full mt-8"
                loading={isSubmitting}
                disabled={!canSubmit || isSubmitting}
              >
                Create subdomain
              </Button>
            )}
          </form.Subscribe>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.navigate({ to: '/onboarding/pro', replace: true })}
            >
              Go back
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => router.navigate({ to: '/onboarding/invitations' })}
            >
              Skip this
            </Button>
          </div>
        </div>
      </form>
    </motion.main>
  );
}
