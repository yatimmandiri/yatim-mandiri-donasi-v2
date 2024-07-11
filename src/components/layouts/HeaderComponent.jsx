'use client';

import { LogoComponent } from '@/components/sections/LogoComponent';
import { UseApp } from '@/hooks/useApp';
import { UseAuth } from '@/hooks/useAuth';
import { CampaignProvider } from '@/hooks/useCampaign';
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createElement, useState } from 'react';
import { ModalComponent } from '../partials/DialogComponent';
import { InputTextComponent } from '../partials/InputComponent';
import { ProgramComponent } from '../sections/ProgramComponent';

export const HeaderComponent = () => {
  const router = useRouter();
  const { headers } = UseApp();
  const { session } = UseAuth();

  return (
    <header
      className={classNames(
        'w-full md:max-w-md mx-auto',
        headers?.fixed
          ? 'sticky top-0 z-30'
          : 'absolute inset-x-0 top-0 z-30 px-1 py-5'
      )}
    >
      <nav
        className={classNames(
          'px-4',
          headers?.title ? 'bg-white py-4' : '',
          headers?.logo ? 'bg-white' : ''
        )}
      >
        <ul
          className={classNames('flex space-x-4 justify-between items-center')}
        >
          <li className='flex space-x-2 items-center'>
            {headers?.backButton &&
              createElement(
                headers?.fixed ? ArrowLeftIcon : ArrowLeftCircleIcon,
                {
                  className: classNames(
                    'cursor-pointer',
                    headers?.fixed ? 'w-5 h-5' : 'w-7 h-7',
                    headers?.fixed ? '' : 'text-white bg-gray-400 rounded-full'
                  ),
                  onClick: () => router.back(),
                }
              )}
            {headers?.logo && <LogoComponent width={60} height={60} />}
            {headers?.title && (
              <span className='text-sm'>{headers?.title}</span>
            )}
          </li>
          {headers?.searching && <HeaderSearchComponent />}
          {headers?.login && !session && (
            <Link href={'/auth/login'} className='text-sm'>
              Masuk
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export const HeaderSearchComponent = () => {
  const [showPencarian, setShowPencarian] = useState(false);

  return (
    <li className='flex-1'>
      <InputTextComponent
        placeholder='Pencarian'
        addonLeft={MagnifyingGlassIcon}
        center={true}
        pill={true}
        readOnly={true}
        onClick={() => setShowPencarian(true)}
      />
      <ModalComponent
        modalTitle='Pencarian'
        withHeader={true}
        isOpen={showPencarian}
        handleOnChange={() => setShowPencarian(false)}
      >
        <div className='flex flex-col text-left p-4'>
          <CampaignProvider
            initialSearch={true}
            empty={true}
            infinite={true}
            searching={true}
            perPage={10}
          >
            <ProgramComponent />
          </CampaignProvider>
        </div>
      </ModalComponent>
    </li>
  );
};
