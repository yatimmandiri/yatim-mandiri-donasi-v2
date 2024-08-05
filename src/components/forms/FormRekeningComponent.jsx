import { UseTransaction } from '@/hooks/useTransaction';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { BanknotesIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export const FormRekeningComponent = () => {
  const { rekenings, currentRekening, changeMetode } = UseTransaction();

  return (
    <RadioGroup
      className='flex flex-col space-y-4'
      value={currentRekening}
      onChange={(e) => changeMetode(e)}
    >
      <div className='flex flex-col border rounded-lg'>
        <div className='flex items-center border-b border-gray-300 p-4 space-x-4'>
          <BanknotesIcon className='w-8 h-8' />
          <div className='flex flex-col space-y-1'>
            <span className='text-sm font-semibold'>
              Transfer Virtual Account
            </span>
            <span>Bayar Donasi Dengan Transfer Ke Virtual Account</span>
          </div>
        </div>
        {rekenings
          .filter(
            (item) =>
              item.provider == 'Midtrans' && item.group == 'bank_transfer'
          )
          .map((item, i) => (
            <Field
              key={i}
              className='flex items-center w-full justify-between space-x-4 px-4 py-4 cursor-pointer'
            >
              <div className='flex flex-row items-center space-x-4'>
                <Image
                  className={'w-10 h-8 shadow-lg'}
                  src={
                    item.icon
                      ? `${process.env.NEXT_PUBLIC_SITE_STORAGE}/${item.icons}`
                      : '/assets/images/placeholder.jpg'
                  }
                  alt={'logo'}
                  width={100}
                  height={100}
                  priority
                />
                <Label className='flex flex-col cursor-pointer'>
                  <span className='font-semibold'>{item.bank}</span>
                  <span>Bayar donasi dengan {item.bank}</span>
                </Label>
              </div>
              <Radio
                value={item}
                className='group flex size-6 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[checked]:text-blue-400'
              >
                <CheckCircleIcon className='size-6 fill-blue-400 text-white opacity-0 transition group-data-[checked]:opacity-100' />
              </Radio>
            </Field>
          ))}
      </div>
      <div className='flex flex-col border rounded-lg'>
        <div className='flex items-center border-b border-gray-300 p-4 space-x-4'>
          <BanknotesIcon className='w-8 h-8' />
          <div className='flex flex-col space-y-1'>
            <span className='text-sm font-semibold'>Transfer Cepat</span>
            <span>Bayar Donasi Mudah Dengan Transfer E-Wallet</span>
          </div>
        </div>
        {rekenings
          .filter(
            (item) => item.provider == 'Midtrans' && item.group == 'e_money'
          )
          .map((item, i) => (
            <Field
              key={i}
              className='flex items-center w-full justify-between space-x-4 px-4 py-4 cursor-pointer'
            >
              <div className='flex flex-row items-center space-x-4'>
                <Image
                  className={'w-10 h-8 shadow-lg'}
                  src={
                    item.icon
                      ? process.env.NEXT_PUBLIC_SITE_STORAGE + item.icon
                      : '/assets/images/placeholder.jpg'
                  }
                  alt={'logo'}
                  width={100}
                  height={100}
                  priority
                />
                <Label className='flex flex-col cursor-pointer'>
                  <span className='font-semibold'>{item.bank}</span>
                  <span>Bayar donasi dengan {item.bank}</span>
                </Label>
              </div>
              <Radio
                value={item}
                className='group flex size-6 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[checked]:text-blue-400'
              >
                <CheckCircleIcon className='size-6 fill-blue-400 text-white opacity-0 transition group-data-[checked]:opacity-100' />
              </Radio>
            </Field>
          ))}
      </div>
      <div className='flex flex-col border rounded-lg'>
        <div className='flex items-center border-b border-gray-300 p-4 space-x-4'>
          <BanknotesIcon className='w-8 h-8' />
          <div className='flex flex-col space-y-1'>
            <span className='text-sm font-semibold'>Transfer Direct Bank</span>
            <span>Bayar Donasi Dengan Transfer Direct Bank</span>
          </div>
        </div>
        {rekenings
          .filter(
            (item) => item.provider == 'Moota' && item.group == 'bank_transfer'
          )
          .map((item, i) => (
            <Field
              key={i}
              className='flex items-center w-full justify-between space-x-4 px-4 py-4 cursor-pointer'
            >
              <div className='flex flex-row items-center space-x-4'>
                <Image
                  className={'w-10 h-8 shadow-lg'}
                  src={
                    item.icon
                      ? process.env.NEXT_PUBLIC_SITE_STORAGE + item.icon
                      : '/assets/images/placeholder.jpg'
                  }
                  alt={'logo'}
                  width={100}
                  height={100}
                  priority
                />
                <Label className='flex flex-col cursor-pointer'>
                  <span className='font-semibold'>{item.bank}</span>
                  <span>Bayar donasi dengan {item.bank}</span>
                </Label>
              </div>
              <Radio
                value={item}
                className='group flex size-6 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[checked]:text-blue-400'
              >
                <CheckCircleIcon className='size-6 fill-blue-400 text-white opacity-0 transition group-data-[checked]:opacity-100' />
              </Radio>
            </Field>
          ))}
      </div>
    </RadioGroup>
  );
};
