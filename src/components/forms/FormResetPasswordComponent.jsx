'use client';

import { ButtonComponent } from '@/components/partials/ButtonComponent';
import { InputTextComponent } from '@/components/partials/InputComponent';
import { UseAuth } from '@/hooks/useAuth';
import { Fieldset } from '@headlessui/react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const FormResetPasswordComponent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const { resetPassword: handleResetPassword, isLoading } = UseAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      token: token,
    },
  });

  const onChangeValue = (event) => {
    const { name, value } = event;
    event.value = value;
    setValue(name, value);
  };

  const submitForm = async (credentials) => {
    await handleResetPassword(credentials);
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
      <InputTextComponent
        type='password'
        label='Password'
        placeholder='Password'
        errors={errors.password && errors.password.message}
        helperText={errors.password && errors.password.message}
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('password', {
            required: { value: true, message: 'This password is required' },
          }),
        }}
      />
      <InputTextComponent
        type='password'
        label='Password Confirmation'
        placeholder='Password Confirmation'
        errors={
          errors.password_confirmation && errors.password_confirmation.message
        }
        helperText={
          errors.password_confirmation && errors.password_confirmation.message
        }
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('password_confirmation', {
            required: {
              value: true,
              message: 'This password confirmation is required',
            },
          }),
        }}
      />
      <ButtonComponent
        disabled={isLoading}
        isLoading={isLoading}
        type='submit'
        text='Reset Password'
        fullWidth={true}
      />
    </Fieldset>
  );
};
