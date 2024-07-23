'use client';

import { ButtonComponent } from '@/components/partials/ButtonComponent';
import {
  InputSwitchComponent,
  InputTextAreaComponent,
  InputTextComponent,
} from '@/components/partials/InputComponent';
import { UseAuth } from '@/hooks/useAuth';
import { UseTransaction } from '@/hooks/useTransaction';
import { PostDataDonation } from '@/services/AppService';
import { onlyNumber } from '@/utils/formatNumber';
import { notification } from '@/utils/toast';
import { Description, Field, Fieldset, Label } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormShohibulComponent } from './FormShohibulComponent';

export const FormDonasiComponent = () => {
  const router = useRouter();
  const path = usePathname();
  const {
    currentNominal,
    hambaAllah,
    setHambaAllah,
    campaigns,
    currentQuantity,
    referals,
    currentRekening,
    totalNominal,
    shohibul,
    postDonation,
    isLoading,
    setIsLoading,
  } = UseTransaction();

  const { session } = UseAuth();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onChangeValue = (event) => {
    const { name, value } = event;

    if (name == 'handphone') {
      event.value = onlyNumber(value);
      setValue(name, onlyNumber(value));
    } else {
      event.value = value;
      setValue(name, value);
    }
  };

  const submitForm = async (credentials) => {
    setIsLoading(true);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        handphone: credentials.handphone,
      })
    );

    await PostDataDonation(credentials)
      .then((response) => {
        notification({ message: response.message, type: 'success' });

        router.push(`/payments/${response.data.no_transaksi}`);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const userStore = localStorage.getItem('userData');

    if (session) {
      setValue('name', session?.name);
      setValue('email', session?.email);
      setValue('handphone', session?.handphone);
    } else if (userStore) {
      const userData = JSON.parse(userStore);
      setValue('name', userData?.name);
      setValue('email', userData?.email);
      setValue('handphone', userData?.handphone);
    }

    if (referals != '') {
      setValue('referals', referals);
    }

    setValue('rekening_id', currentRekening?.id);
    setValue('quantity', currentQuantity);
    setValue('campaign_id', campaigns?.id);
    setValue('hambaallah', hambaAllah);
    setValue('nominal_donasi', currentNominal.replaceAll('.', ''));
    setValue('total_donasi', totalNominal.toString());
    setValue('shohibul', JSON.stringify(shohibul));
  }, [
    campaigns,
    hambaAllah,
    currentNominal,
    totalNominal,
    currentQuantity,
    session,
    shohibul,
    referals,
    currentRekening,
    setValue,
  ]);

  return (
    <Fieldset
      as='form'
      onSubmit={handleSubmit(submitForm)}
      className='flex flex-col space-y-4 text-left min-h-screen'
    >
      <div className='flex flex-col flex-1 space-y-3 px-4'>
        <MetodePembayaranComponent
          label='Metode Pembayaran'
          errors={errors.rekening_id && errors.rekening_id.message}
          helperText={errors.rekening_id && errors.rekening_id.message}
          register={{
            ...register('rekening_id', {
              required: {
                value: true,
                message: 'This rekening is required',
              },
            }),
          }}
        />
        {!session && (
          <div className='flex flex-col space-y-2'>
            <hr />
            <div className='flex flex-row items-center justify-center space-x-4 py-2'>
              <div className='w-28'>
                <ButtonComponent
                  text='Masuk'
                  fullWidth={true}
                  variant='outline'
                  className='py-3'
                  onClick={() =>
                    router.push(
                      `/auth/login?${new URLSearchParams({
                        callbackUrl: path,
                        formDonasi: true,
                        nominal: currentNominal.replaceAll('.', ''),
                        quantity: currentQuantity,
                      })}`
                    )
                  }
                />
              </div>
              <div className='flex flex-col flex-1'>
                <span className='font-semibold text-sm'>Donasi Cepat</span>
                <span>Masuk ke Yatim Mandiri untuk donasi lebih cepat</span>
              </div>
            </div>
            <hr />
          </div>
        )}
        {!session && (
          <div className='flex flex-col space-y-3'>
            <legend className='text-sm font-semibold'>
              Lengkapi Data Diri
            </legend>
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
                  required: {
                    value: true,
                    message: 'This handphone is required',
                  },
                }),
              }}
            />
          </div>
        )}
        {campaigns.template == 'T3' && <FormShohibulComponent />}
        <div className='flex flex-row items-center justify-center'>
          <div className='flex flex-col space-y-2'>
            <span className='text-sm font-semibold'>Donasi Anonim</span>
            <span>
              Dengan mengaktifkan donasi anonim, profil donasimu akan disamarkan
              dengan “Hamba Allah”
            </span>
          </div>
          <InputSwitchComponent
            enabled={hambaAllah}
            setEnabled={() => setHambaAllah(!hambaAllah)}
          />
        </div>
        <InputTextAreaComponent
          label='Tulis Doa dan Harapan'
          placeholder='Tulis Doa dan Harapan'
          register={{
            ...register('keterangan', {}),
          }}
        />
        <span>
          Dengan berdonasi di laman ini, berarti kamu telah menyetujui Syarat &
          Ketentuan
        </span>
      </div>
      <div className='sticky bottom-0 z-30 p-4 border-t shadow bg-white'>
        <ButtonComponent
          disabled={isLoading}
          type='submit'
          text='Lanjutkan Pembayaran'
          fullWidth={true}
        />
      </div>
    </Fieldset>
  );
};

export const MetodePembayaranComponent = ({
  className = '',
  center = false,
  pill = false,
  label = false,
  errors = false,
  helperText = false,
  register = false,
  ...props
}) => {
  const { currentRekening, showFormRekening, setShowFormRekening } =
    UseTransaction();

  return (
    <Field className='flex flex-col space-y-2.5'>
      {label && <Label className='text-sm font-medium'>{label}</Label>}
      <div
        className={classNames(
          'flex flex-row items-center justify-between w-full p-2.5 border rounded-lg',
          errors
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'focus:ring-blue-500 focus:border-blue-500'
        )}
      >
        <div className='flex flex-row items-center justify-center space-x-3'>
          <Image
            className='object-fill h-6 w-10'
            src={
              currentRekening?.icon
                ? process.env.NEXT_PUBLIC_SITE_STORAGE + currentRekening.icon
                : '/assets/images/placeholder.jpg'
            }
            alt={'logo'}
            width={100}
            height={100}
            priority={true}
          />
          <span>{currentRekening?.bank}</span>
        </div>
        <span
          onClick={() => setShowFormRekening(true)}
          className='cursor-pointer text-baseColor-500'
        >
          Ganti Metode
        </span>
      </div>
      {helperText && (
        <Description
          className={classNames(
            'flex items-center space-x-2 text-xs',
            errors && 'text-red-500'
          )}
        >
          <InformationCircleIcon
            className={classNames(
              'w-4 h-4',
              errors ? 'text-red-500' : 'text-yellow-500'
            )}
          />
          <span>{helperText}</span>
        </Description>
      )}
    </Field>
  );
};
