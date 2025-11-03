import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { CrownIcon, XIcon } from 'lucide-react';
import { Badge } from 'shadcn/badge';
import { Button } from 'shadcn/button';
import { Field, FieldGroup } from 'shadcn/field';
import { Input } from 'shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shadcn/select';
import { toast } from 'sonner';
import { SimpleTooltip } from '~/components';
import { INVITABLE_ROLES } from '~/features/auth/constants';
import { InvitationsSchema } from '~/features/onboarding/schemas';
import { renderIf, sleep } from '~/lib';
import { getFieldProps, getSubmitHandler } from '~/lib/forms';
import type { InvitableRole } from '~/features/auth/constants';
import type { InviteSchemaInput } from '~/features/onboarding/schemas';

export const Route = createFileRoute('/app/(onboarding)/onboarding/invitations')({
  component: OrgInvitationsPage,
});

function OrgInvitationsPage() {
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
    },
  });

  return (
    <main>
      <div className="mb-8">
        <div className="text-center mb-2">
          <Badge variant="secondary">
            <CrownIcon />
            Pro plan required
          </Badge>
        </div>

        <h1>
          Invite people to your <span>Peckr</span> organisation.
        </h1>
        <p>
          Give us a list of people who should be part of your organisation. Invitations sent to them
          will be valid for 7 days.
        </p>
      </div>

      <form onSubmit={getSubmitHandler(form)}>
        <FieldGroup>
          <form.Field name="invites" mode="array">
            {(field) => (
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Email</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      field.pushValue({
                        id: crypto.randomUUID(),
                        role: 'Member',
                        email: '',
                      })
                    }
                  >
                    Add invite
                  </Button>
                </div>

                <div className="grid gap-2">
                  {field.state.value.map((_, index) => {
                    return (
                      <div key={index} className="relative w-full flex">
                        {renderIf(
                          index > 0,
                          <SimpleTooltip title="Remove this invite">
                            <Button
                              type="button"
                              variant="outline:destructive"
                              className="absolute -right-12"
                              aria-label="Remove this invite"
                              onClick={() => field.removeValue(index)}
                            >
                              <XIcon />
                            </Button>
                          </SimpleTooltip>,
                        )}

                        <form.Field name={`invites[${index}].email`}>
                          {(inviteField) => {
                            const { isInvalid, fieldProps } = getFieldProps(inviteField);
                            return (
                              <Field data-invalid={isInvalid}>
                                <Input
                                  {...fieldProps}
                                  className="rounded-r-none"
                                  wrapperClass="grow"
                                />
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
                                      className="!w-[103px] border-0 rounded-l-none border-y border-r rounded-r-md border-border !h-[36.44] py-0 focus-visible:shadow-none focus-visible:ring-0 focus-visible:border-border"
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
                    );
                  })}
                </div>
              </div>
            )}
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
                Send Invitations
              </Button>
            )}
          </form.Subscribe>

          <div className="text-center">
            <Button type="button" variant="ghost">
              Skip this
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
