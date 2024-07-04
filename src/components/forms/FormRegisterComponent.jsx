'use client';

import { ButtonComponent } from '@/components/partials/ButtonComponent';
import { InputTextComponent } from '@/components/partials/InputComponent';
import { UseAuth } from '@/hooks/useAuth';
import { onlyNumber } from '@/utils/formatNumber';
import { Fieldset } from '@headlessui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export const FormRegisterComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const { register: handleRegister, isLoading } = UseAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');

  const onChangeValue = (event) => {
    const { name, value } = event;

    const inputValue = name == 'handphone' ? onlyNumber(value) : value;

    event.value = inputValue;
    setValue(name, inputValue);
  };

  const submitForm = async (credentials) => {
    await handleRegister(credentials);
  };

  return (
    <Fieldset
      as='form'
      onSubmit={handleSubmit(submitForm)}
      className='flex flex-col space-y-4 pt-4'
    >
      <InputTextComponent
        type='text'
        label='Name'
        placeholder='Name'
        errors={errors.name && errors.name.message}
        helperText={errors.name && errors.name.message}
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('name', {
            required: { value: true, message: 'This name is required' },
          }),
        }}
      />
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
        type='text'
        label='Handphone'
        placeholder='Handphone'
        errors={errors.handphone && errors.handphone.message}
        helperText={
          errors.handphone
            ? errors.handphone.message
            : 'Harap Masukkan Nomor Whatsapp Untuk Notifikasi'
        }
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('handphone', {
            required: { value: true, message: 'This handphone is required' },
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
        helperText={
          errors.password ? errors.password.message : 'Minimum 8 karakter'
        }
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('password', {
            required: { value: true, message: 'This password is required' },
            minLength: {
              value: 8,
              message: 'This password minimum length should be 8',
            },
          }),
        }}
      />
      <InputTextComponent
        type={showPasswordConfirmation ? 'text' : 'password'}
        label='Password Confirmation'
        placeholder='Password Confirmation'
        addonRight={showPasswordConfirmation ? EyeIcon : EyeSlashIcon}
        addonRightHandler={() =>
          setShowPasswordConfirmation(!showPasswordConfirmation)
        }
        errors={
          errors.password_confirmation && errors.password_confirmation.message
        }
        helperText={
          errors.password_confirmation && errors.password_confirmation.message
        }
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('password_confirmation', {
            validate: (value) =>
              value === password.current ||
              'The password confirmation do not match',
          }),
        }}
      />
      <span>
        Dengan mendaftar, saya menyetujui{' '}
        <b className='text-blue-500'>Syarat & Ketentuan</b> serta{' '}
        <b className='text-blue-500'>Kebijakan Privasi</b>
      </span>
      <ButtonComponent
        disabled={isLoading}
        isLoading={isLoading}
        type='submit'
        text='Daftar'
        fullWidth={true}
      />
    </Fieldset>
  );
};
