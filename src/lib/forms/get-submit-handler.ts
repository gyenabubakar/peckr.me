import type { FormEventHandler } from 'react';

interface FormWithHandlers {
  handleSubmit: () => void | Promise<void>;
}

export function getSubmitHandler(form: FormWithHandlers): FormEventHandler<HTMLFormElement> {
  return (e) => {
    e.preventDefault();
    form.handleSubmit();
  };
}
