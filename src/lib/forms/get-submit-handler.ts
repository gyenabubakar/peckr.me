/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FormEventHandler } from 'react';
import type { ReactFormExtendedApi } from '@tanstack/react-form';

export function getSubmitHandler(form: Form): FormEventHandler<HTMLFormElement> {
  return (e) => {
    e.preventDefault();
    form.handleSubmit();
  };
}

type Form = ReactFormExtendedApi<any, any, any, any, any, any, any, any, any, any, any, any>;
