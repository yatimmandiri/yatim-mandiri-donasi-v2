'use client';

import { ButtonComponent } from '@/components/partials/ButtonComponent';
import { InputTextComponent } from '@/components/partials/InputComponent';
import { UseAuth } from '@/hooks/useAuth';
import { Fieldset } from '@headlessui/react';
import { useForm } from 'react-hook-form';

export const FormForgotPasswordComponent = () => {
  const { forgotPassword: handleForgotPassword, isLoading } = UseAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onChangeValue = (event) => {
    const { name, value } = event;
    event.value = value;
    setValue(name, value);
  };

  const submitForm = async (credentials) => {
    await handleForgotPassword(credentials);
  };

  return (
    <Fieldset
      as='form'
      onSubmit={handleSubmit(submitForm)}
      className='flex flex-col space-y-4 pt-4'
    >
      <InputTextComponent
        type='email'
        label='Email'
        placeholder='Email'
        errors={errors.email && errors.email.message}
        helperText={errors.email && errors.email.message}
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('email', {
            required: { value: true, message: 'This email is required' },
            email: { value: true, message: 'This email not valid' },
          }),
        }}
      />
      <ButtonComponent
        disabled={isLoading}
        isLoading={isLoading}
        type='submit'
        text='Forgot Password'
        fullWidth={true}
      />
    </Fieldset>
  );
};
