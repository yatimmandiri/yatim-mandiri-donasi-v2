'use client';

import {
  FormZakatEmasComponent,
  FormZakatMaalComponent,
  FormZakatPerdaganganComponent,
  FormZakatProfesiComponent,
} from '@/components/forms/FormZakatComponent';
import { ButtonComponent } from '@/components/partials/ButtonComponent';
import { AlertComponent } from '@/components/partials/DialogComponent';
import { UseKalkulator } from '@/hooks/useKalkulator';
import { formatRupiah } from '@/utils/formatNumber';
import {
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import classNames from 'classnames';
import Image from 'next/image';
import { useState } from 'react';

export const PilihanZakatComponent = () => {
  const tabsList = [
    { name: 'Zakat Emas', icons: '/assets/images/gold.png' },
    { name: 'Zakat Perdagangan', icons: '/assets/images/dagang.png' },
    { name: 'Zakat Profesi', icons: '/assets/images/work.png' },
    { name: 'Zakat Maal', icons: '/assets/images/cart.png' },
  ];

  const [tabActive, setTabActive] = useState(0);

  const {
    showResult,
    wajibZakat,
    calculateResult,
    bayarZakat,
    modalTitle,
    setShowResult,
  } = UseKalkulator();

  return (
    <div className='flex flex-col space-y-4'>
      <span className='text-sm font-semibold'>Pilihan Zakat</span>
      <TabGroup
        defaultIndex={tabActive}
        onChange={(index) => {
          setTabActive(index);
        }}
      >
        <TabList
          className={classNames('flex flex-row space-x-4 overflow-x-auto')}
        >
          {tabsList.map((tab, i) => (
            <Tab
              as={Button}
              key={i}
              className={classNames(
                'inline-flex justify-center items-center rounded space-x-3 px-6 text-nowrap border outline-none p-3',
                tabActive == i && 'border-baseColor-500 text-baseColor-500'
              )}
            >
              <Image src={tab.icons} alt='image' width={20} height={20} />
              <span className='flex justify-center items-center'>
                {tab.name}
              </span>
            </Tab>
          ))}
        </TabList>
        <TabPanels className='pt-4'>
          {tabsList.map((tab, i) => (
            <TabPanel key={i}>
              <SwitchZakatComponent tab={tab} index={i} />
              <AlertComponent
                isOpen={showResult}
                modalTitle={modalTitle}
                withHeader={true}
                handleOnChange={() => setShowResult(false)}
              >
                <div className='flex flex-col space-y-4 p-4'>
                  <Image
                    src={'/assets/images/kalkulator_result.svg'}
                    alt='logo'
                    width={100}
                    height={100}
                    className='w-48 h-48 mx-auto'
                  />
                  <div className='flex flex-col space-y-2'>
                    <span className='text-sm font-semibold'>
                      Hasil Perhitungan {modalTitle}
                    </span>
                    {wajibZakat ? (
                      <span className='text-sm'>
                        Anda Berhak Membayar {modalTitle} Sebesar
                      </span>
                    ) : (
                      <span className='text-sm'>
                        Anda Belum Berhak Membayar {modalTitle}
                      </span>
                    )}
                  </div>
                  <span className='text-lg font-bold'>
                    {formatRupiah(calculateResult.toString(), 'Rp')}
                  </span>
                  <div className='flex space-x-4 items-center'>
                    <ButtonComponent
                      onClick={() => setShowResult(!showResult)}
                      text='Hitung Lagi'
                      fullWidth={true}
                    />
                    <ButtonComponent
                      onClick={() => bayarZakat()}
                      text={wajibZakat ? 'Bayar Sekarang' : 'Infak Sekarang'}
                      fullWidth={true}
                    />
                  </div>
                </div>
              </AlertComponent>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export const SwitchZakatComponent = ({ index, tab }) => {
  switch (index) {
    case 1:
      return <FormZakatPerdaganganComponent />;
    case 2:
      return <FormZakatProfesiComponent />;
    case 3:
      return <FormZakatMaalComponent />;
    default:
      return <FormZakatEmasComponent />;
  }
};
