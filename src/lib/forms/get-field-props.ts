/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ChangeEvent } from 'react';
import type { FieldApi } from '@tanstack/react-form';

export function getFieldProps(field: Field, fallback?: any) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const value = fallback !== undefined ? (field.state.value ?? fallback) : field.state.value;
  return {
    isInvalid,
    fieldProps: {
      id: field.name,
      name: field.name,
      value,
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
