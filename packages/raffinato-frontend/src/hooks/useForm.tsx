import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

type Config<T> = {
  onSubmit: (values: T) => void;
  validate?: (values: T) => Record<any, any>;
};

function useForm<T>(initialValues: T, config: Config<T>) {
  const { onSubmit, validate } = config;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [k: string]: any } | undefined>(() => {
    return Object.fromEntries(
      Object.keys(initialValues).map((key) => [key, null])
    );
  });

  useEffect(() => {
    if (!Object.keys(errors || {}).length && isSubmitting) {
      onSubmit(values);
      setIsSubmitting(false);
    }
  }, [errors, onSubmit, isSubmitting, values]);

  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: MouseEvent<any>) => {
    e.preventDefault();
    setErrors(validate?.(values));
    setIsSubmitting(true);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
  };
}

export default useForm;
