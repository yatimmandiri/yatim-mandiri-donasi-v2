'use client';

import { ButtonComponent } from '@/components/partials/ButtonComponent';
import { InputTextComponent } from '@/components/partials/InputComponent';
import { UseAuth } from '@/hooks/useAuth';
import { Fieldset } from '@headlessui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const FormLoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { login: handleLogin, isLoading } = UseAuth();

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
    await handleLogin(credentials);
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
        type={showPassword ? 'text' : 'password'}
        label='Password'
        placeholder='Password'
        addonRight={showPassword ? EyeIcon : EyeSlashIcon}
        addonRightHandler={() => setShowPassword(!showPassword)}
        errors={errors.password && errors.password.message}
        helperText={errors.password && errors.password.message}
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('password', {
            required: { value: true, message: 'This password is required' },
          }),
        }}
      />
      <Link
        href='/auth/forgot-password'
        className='text-xs text-right font-medium text-blue-500'
      >
        Lupa Password ?
      </Link>
      <ButtonComponent
        disabled={isLoading}
        isLoading={isLoading}
        type='submit'
        text='Masuk'
        fullWidth={true}
      />
    </Fieldset>
  );
};
