'use client';

import { ActionSheetComponent } from '@/components/partials/DialogComponent';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import parse from 'html-react-parser';
import { useState } from 'react';
import { FaMoneyCheck } from 'react-icons/fa';
import { ButtonComponent } from '../partials/ButtonComponent';

export const TentangProgramComponent = ({ campaigns = [] }) => {
  const [showRincian, setShowRincian] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <section className='flex flex-col space-y-4'>
      <span className='title-section'>Tentang Program</span>
      <button
        onClick={() => setShowRincian(true)}
        className='inline-flex items-center justify-between px-4 border p-3 rounded-lg bg-baseColor-300 space-x-2'
      >
        <div className='flex flex-row space-x-4'>
          <FaMoneyCheck />
          <span>Lihat rincian penggunaan dana</span>
        </div>
        <ChevronRightIcon className='w-4 h-4' />
      </button>

      <div className='flex flex-col space-y-1'>
        <span className='font-semibold'>Deskripsi</span>
        <div
          onClick={() => setShowDescription(true)}
          className='line-clamp-3 cursor-pointer'
        >
          {parse(campaigns?.description)}
        </div>
      </div>

      {/* Rincian */}
      <ActionSheetComponent
        modalTitle='Rincian Penggunaan Program'
        withHeader={true}
        isOpen={showRincian}
        handleOnChange={() => setShowRincian(false)}
      >
        <div className='flex flex-col text-left rounded-t-xl h-72 overflow-y-auto scrollbar-hide'>
          {/* <div className='flex justify-between sticky top-0 p-4 bg-white'>
            <div className='flex items-center space-x-2'>
              <span className='font-semibold'>Rincian Penggunaan Program</span>
            </div>
          </div> */}
          <div className='text-xs px-4'>Comming Soon</div>
        </div>
      </ActionSheetComponent>

      {/* Deskripsi */}
      <ActionSheetComponent
        fullScreen={true}
        modalTitle='Deskripsi Program'
        withHeader={true}
        isOpen={showDescription}
        handleOnChange={() => setShowDescription(false)}
      >
        <div className='flex flex-col h-96 justify-between rounded-t-xl overflow-y-auto scrollbar-hide'>
          <div className='description px-4'>{parse(campaigns.description)}</div>
          <div className='sticky bottom-0 z-30 px-4 py-2 shadow bg-white'>
            <ButtonComponent
              type='submit'
              form='formDonasi'
              text='Donasi Sekarang'
              fullWidth={true}
            />
          </div>
        </div>
      </ActionSheetComponent>
    </section>
  );
};
