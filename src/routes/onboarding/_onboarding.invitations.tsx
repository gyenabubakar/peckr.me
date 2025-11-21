import { useForm } from '@tanstack/react-form';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { PlusIcon, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from 'shadcn/button';
import { Field, FieldError, FieldGroup } from 'shadcn/field';
import { Input } from 'shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shadcn/select';
import { toast } from 'sonner';
import { INVITABLE_ROLES } from '~/features/auth/constants';
import { ONBOARDING_PAGE_TRANSITION } from '~/features/onboarding/constants';
import { InvitationsSchema } from '~/features/onboarding/schemas';
import { ProRequiredBadge } from '~/features/onboarding/ui';
import { SimpleTooltip } from '~/components';
import { renderIf, sleep } from '~/lib';
import { getFieldProps, getSubmitHandler } from '~/lib/forms';
import type { InvitableRole } from '~/features/auth/constants';
import type { InviteSchemaInput } from '~/features/onboarding/schemas';

export const Route = createFileRoute('/onboarding/_onboarding/invitations')({
  component: SpaceInvitationsPage,
});

function SpaceInvitationsPage() {
  const router = useRouter();
  const form = useForm({
    validators: {
      onBlur: InvitationsSchema,
      onChange: InvitationsSchema,
      onSubmit: InvitationsSchema,
    },
    defaultValues: {
      invites: [
        {
          id: crypto.randomUUID(),
          email: '',
          role: 'Member',
        },
      ] as InviteSchemaInput[],
    },
    async onSubmit({ value }) {
      await sleep();
      console.log('onSubmit:', value);
      toast.success('Form submitted successfully');
      router.navigate({ to: `/app/$slug`, params: { slug: 'gyen' } });
    },
  });

  function handleRemoveInvite(index: number) {
    const currentInvites = form.state.values.invites;
    const updatedInvites = currentInvites.filter((_, i) => i !== index);
    form.setFieldValue('invites', updatedInvites);
  }

  return (
    <motion.main {...ONBOARDING_PAGE_TRANSITION}>
      <div className="mb-8">
        <ProRequiredBadge />
        <h1>
          Invite people to your <span>Peckr</span> space.
        </h1>
        <p>
          Give us a list of people who should be part of your space. Invitations sent to them will
          be valid for 7 days.
        </p>
      </div>

      <form onSubmit={getSubmitHandler(form)}>
        <FieldGroup>
          <div>
            <p className="text-sm font-medium">Email</p>

            <div className="grid gap-2">
              <AnimatePresence mode="popLayout">
                <form.Subscribe selector={(state) => state.values.invites}>
                  {(invites) =>
                    invites.map((_, index) => {
                      // TODO: fix the peculiar bug when using `invite.id` as key.
                      // the bug: after adding multiple entries, removing an entry
                      // in the middle of the array sets the last entries' role to an empty string,
                      // which causes a form error because '' isn't an acceptable role.
                      return (
                        <motion.div
                          key={index}
                          layout
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="relative w-full flex">
                            <div className="absolute w-[92px] flex items-center gap-1 -right-24">
                              {renderIf(
                                index > 0,
                                <SimpleTooltip title="Remove this invite">
                                  <Button
                                    type="button"
                                    variant="outline:destructive"
                                    aria-label="Remove this invite"
                                    onClick={() => handleRemoveInvite(index)}
                                  >
                                    <XIcon />
                                  </Button>
                                </SimpleTooltip>,
                              )}
                              {renderIf(
                                index === 0,
                                <SimpleTooltip title="Add an invite">
                                  <Button
                                    type="button"
                                    variant="outline:green"
                                    aria-label="Add an invite"
                                    onClick={() =>
                                      form.setFieldValue('invites', [
                                        ...invites,
                                        {
                                          id: crypto.randomUUID(),
                                          role: 'Member',
                                          email: '',
                                        },
                                      ])
                                    }
                                  >
                                    <PlusIcon />
                                  </Button>
                                </SimpleTooltip>,
                              )}
                            </div>

                            <form.Field name={`invites[${index}].email`}>
                              {(inviteField) => {
                                const { isInvalid, fieldProps } = getFieldProps(inviteField, '');
                                return (
                                  <Field data-invalid={isInvalid}>
                                    <Input {...fieldProps} className="rounded-r-none z-[2]" />
                                  </Field>
                                );
                              }}
                            </form.Field>

                            <div className="bg-gray-50 flex items-center justify-center">
                              <form.Field name={`invites[${index}].role`}>
                                {(inviteField) => {
                                  const { isInvalid } = getFieldProps(inviteField);
                                  return (
                                    <Field orientation="responsive" data-invalid={isInvalid}>
                                      <Select
                                        name={inviteField.name}
                                        value={inviteField.state.value}
                                        onValueChange={(role) =>
                                          inviteField.handleChange(role as InvitableRole)
                                        }
                                      >
                                        <SelectTrigger
                                          aria-invalid={isInvalid}
                                          className="w-[103px]! border-0 rounded-l-none border-y border-r rounded-r-md border-border py-0 focus-visible:shadow-none focus-visible:ring-0 focus-visible:border-border"
                                        >
                                          <SelectValue placeholder="Role" />
                                        </SelectTrigger>
                                        <SelectContent position="item-aligned">
                                          {INVITABLE_ROLES.map((role) => (
                                            <SelectItem key={role} value={role}>
                                              {role}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </Field>
                                  );
                                }}
                              </form.Field>
                            </div>
                          </div>

                          <form.Field name={`invites[${index}].email`}>
                            {(inviteField) => {
                              const { isInvalid } = getFieldProps(inviteField);
                              return renderIf(
                                isInvalid,
                                <FieldError errors={inviteField.state.meta.errors} />,
                              );
                            }}
                          </form.Field>
                        </motion.div>
                      );
                    })
                  }
                </form.Subscribe>
              </AnimatePresence>
            </div>
          </div>
        </FieldGroup>

        <div className="space-y-3">
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                className="w-full mt-8"
                loading={isSubmitting}
                disabled={!canSubmit || isSubmitting}
              >
                Send Invitations
              </Button>
            )}
          </form.Subscribe>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.navigate({ to: '/onboarding/subdomain', replace: true })}
            >
              Go back
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => router.navigate({ to: `/app/$slug`, params: { slug: 'gyen' } })}
            >
              Skip this
            </Button>
          </div>
        </div>
      </form>
    </motion.main>
  );
}
