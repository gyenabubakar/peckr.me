/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ChangeEvent } from 'react';
import type { FieldApi } from '@tanstack/react-form';

export function getFieldProps(field: Field) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return {
    isInvalid,
    fieldProps: {
      id: field.name,
      name: field.name,
      value: field.state.value,
      onBlur: field.handleBlur,
      onChange: (e: ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value),
      'aria-invalid': isInvalid,
    },
  };
}

type Field = FieldApi<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;
