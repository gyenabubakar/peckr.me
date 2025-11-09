import { useEffect, useMemo, useRef } from 'react';
import { useForm, useStore } from '@tanstack/react-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ImageUpIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from 'shadcn/button';
import { Field, FieldError, FieldGroup, FieldLabel } from 'shadcn/field';
import { Input } from 'shadcn/input';
import { toast } from 'sonner';
import type { ChangeEvent } from 'react';
import { ONBOARDING_PAGE_TRANSITION } from '~/features/onboarding/constants';
import { OrganisationSchema } from '~/features/onboarding/schemas';
import { renderIf, sleep } from '~/lib';
import { getFieldProps, getSubmitHandler } from '~/lib/forms';
import type { OrganisationSchemaInput } from '~/features/onboarding/schemas';

export const Route = createFileRoute('/onboarding/_onboarding/')({
  component: CreateOrganisationPage,
});

function CreateOrganisationPage() {
  const navigate = useNavigate();
  const form = useForm({
    validators: {
      onBlur: OrganisationSchema,
      onChange: OrganisationSchema,
      onSubmit: OrganisationSchema,
    },
    defaultValues: {
      name: '',
      slug: '',
      logo: null,
    } as OrganisationSchemaInput,
    async onSubmit({ value }) {
      await sleep();

      console.log('onSubmit:', value);
      toast.success('Created workspace successfully.');

      await navigate({ to: '/onboarding/pro' });
    },
  });

  const logo = useStore(form.store, (s) => s.values.logo);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const tempFileURL = useMemo(() => (logo ? URL.createObjectURL(logo) : null), [logo]);

  useEffect(() => {
    return () => {
      if (tempFileURL) URL.revokeObjectURL(tempFileURL);
    };
  }, [tempFileURL]);

  function onFilesChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    form.setFieldValue('logo', Array.from(e.target.files).pop() ?? null);
  }

  function handleFileInputButton() {
    if (!fileInputRef.current) return;

    if (!tempFileURL) {
      fileInputRef.current.click();
      return;
    }

    fileInputRef.current.value = '';
    form.setFieldValue('logo', null);
  }

  return (
    <motion.main {...ONBOARDING_PAGE_TRANSITION}>
      <div className="mb-8">
        <h1>
          Create your <span>Peckr</span> organisation.
        </h1>
        <p>Set up a shared space to manage your links with your team.</p>
      </div>

      <form onSubmit={getSubmitHandler(form)}>
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
              const { isInvalid, fieldProps } = getFieldProps(field);
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Organisation name</FieldLabel>
                  <Input {...fieldProps} />
                  {renderIf(isInvalid, <FieldError errors={field.state.meta.errors} />)}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="slug">
            {(field) => {
              const { isInvalid, fieldProps } = getFieldProps(field);
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Organisation slug</FieldLabel>

                  <div className="relative w-full flex">
                    <div className="bg-gray-50 px-2.5 border-y border-l rounded-l-md border-border flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">peckr.me/app/</span>
                    </div>
                    <Input {...fieldProps} className=" rounded-l-none" wrapperClass="grow" />
                  </div>

                  {renderIf(isInvalid, <FieldError errors={field.state.meta.errors} />)}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="logo">
            {(field) => {
              const { isInvalid } = getFieldProps(field);
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Organisation logo</FieldLabel>

                  <input
                    ref={fileInputRef}
                    type="file"
                    id={field.name}
                    name={field.name}
                    className="hidden"
                    accept="image/*"
                    multiple={false}
                    onChange={onFilesChange}
                  />

                  <div className="relative w-max h-max flex items-center gap-5">
                    {!tempFileURL ? (
                      <div className="size-20 rounded-lg border border-border flex items-center justify-center">
                        <ImageUpIcon className="size-7 text-muted-foreground" strokeWidth={1.2} />
                      </div>
                    ) : (
                      <img
                        src={tempFileURL}
                        className="size-20 rounded-lg"
                        alt="your selected logo for your organisation"
                      />
                    )}

                    <div className="space-y-1.5">
                      <Button
                        type="button"
                        variant={tempFileURL ? 'outline:destructive' : 'outline'}
                        size="sm"
                        onClick={handleFileInputButton}
                      >
                        {tempFileURL ? 'Remove image' : 'Select image'}
                      </Button>

                      <p className="text-sm text-muted-foreground">
                        Any 1:1 image, e.g. 160x160 &bull; Max. 3MB
                      </p>
                    </div>
                  </div>

                  {renderIf(isInvalid, <FieldError errors={field.state.meta.errors} />)}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              className="w-full mt-8"
              loading={isSubmitting}
              disabled={!canSubmit || isSubmitting}
            >
              Create organisation
            </Button>
          )}
        </form.Subscribe>
      </form>
    </motion.main>
  );
}
