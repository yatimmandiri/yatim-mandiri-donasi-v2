import { UseTransaction } from '@/hooks/useTransaction';
import { Fieldset } from '@headlessui/react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ButtonIconComponent } from '../partials/ButtonComponent';
import { InputTextComponent } from '../partials/InputComponent';

export const FormShohibulComponent = () => {
  const {
    campaigns,
    removeShohibul,
    addShohibul,
    shohibul,
    shohibulName,
    setShohibulName,
  } = UseTransaction();

  return (
    <Fieldset className='flex flex-col space-y-4'>
      <div className='flex flex-col'>
        <span className='text-sm font-semibold'>
          {campaigns.categories_id == 2
            ? 'Daftar Shohibul Qurban'
            : 'Daftar Muzakki'}
        </span>
        <span>
          Masukkan Nama{' '}
          {campaigns.categories_id == 2 ? 'Shohibul Qurban' : 'Muzakki'}
        </span>
      </div>
      <div className='flex flex-row items-center space-x-4'>
        <div className='flex-1'>
          <InputTextComponent
            placeholder={'Nama'}
            onChange={(e) => setShohibulName(e.target.value)}
            value={shohibulName}
          />
        </div>
        <ButtonIconComponent
          icons={PlusIcon}
          variant='outline'
          pill={false}
          onClick={() => addShohibul()}
        />
      </div>
      {shohibul.length > 0 && (
        <ul id='list-nama' className='flex flex-col space-y-2'>
          {shohibul?.map((items, i) => (
            <li
              key={i}
              className={
                'flex justify-between bg-baseColor-500 font-semibold rounded p-2 px-4 text-white'
              }
            >
              <span>{items}</span>
              <XMarkIcon
                className='w-5 h-5'
                onClick={() => removeShohibul(items)}
              />
            </li>
          ))}
        </ul>
      )}
    </Fieldset>
  );
};
