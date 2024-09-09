'use client';

import { FormNominalComponent } from '@/components/forms/FormNominalComponent';
import { UseTransaction } from '@/hooks/useTransaction';
import { formatRupiah } from '@/utils/formatNumber';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import {
  InformationCircleIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ButtonComponent } from '../partials/ButtonComponent';

export const NominalComponent = () => {
  const { campaigns, currentNominal, currentQuantity, totalNominal } =
    UseTransaction();

  switch (campaigns.template) {
    case 'T2':
      return (
        <div className='flex flex-col space-y-3'>
          <span>Masukkan Nilai {campaigns?.name}</span>
          <div className='flex flex-col space-y-3'>
            <FormNominalComponent nominalField={true} quantityField={false} />
            <span className='text-center'>
              Belum tau jumlah zakatmu?{' '}
              <Link
                href='/kalkulator'
                className='font-medium text-baseColor-500'
              >
                Hitung di sini
              </Link>
            </span>
          </div>
        </div>
      );
    case 'T3':
      return (
        <div className='flex flex-col space-y-3'>
          <div className='flex justify-between items-center space-x-2'>
            <span>Jumlah Orang</span>
            <FormNominalComponent nominalField={false} quantityField={true} />
          </div>
          <hr />
          <div className='flex flex-row items-center justify-between'>
            <ShoppingBagIcon className='w-8 h-8' />
            <div className='flex flex-col text-right font-semibold'>
              <span>Total</span>
              <span className='text-baseColor-500'>
                {formatRupiah(totalNominal.toString(), 'Rp')}
              </span>
            </div>
          </div>
        </div>
      );
    case 'T4':
      return (
        <div className='flex flex-col space-y-3'>
          <span>
            Kamu bisa berdonasi secara Mandiri atau Patungan sesuai kemampuanmu
          </span>
          <PilihanPaketComponent />
        </div>
      );
    case 'T5':
      return (
        <div className='flex flex-col space-y-3'>
          <span>Isi Nominal Donasi</span>
          <div className='flex flex-col space-y-3'>
            <FormNominalComponent nominalField={true} quantityField={false} />
            <ButtonNominalComponent />
          </div>
        </div>
      );
    default:
      return (
        <div className='flex flex-col space-y-3'>
          <span>Isi Nominal Donasi</span>
          <div className='flex flex-col space-y-3'>
            <FormNominalComponent nominalField={true} quantityField={false} />
            <ButtonNominalComponent />
          </div>
        </div>
      );
  }
};

export const PilihanPaketComponent = () => {
  const tabsList = [
    { name: 'Patungan', icons: '/assets/images/gold.png' },
    { name: 'Paket', icons: '/assets/images/dagang.png' },
  ];

  const {
    campaigns,
    totalNominal,
    setCurrentQuantity,
    currentQuantity,
    currentNominal,
    setTotalNominal,
    setCurrentNominal,
  } = UseTransaction();

  const [tabActive, setTabActive] = useState(0);

  useEffect(() => {
    setCurrentNominal(formatRupiah(campaigns.nominal.toString()));
    setCurrentQuantity(1);
  }, [tabActive, campaigns, setCurrentNominal, setCurrentQuantity]);

  return (
    <TabGroup
      defaultIndex={tabActive}
      onChange={(index) => {
        setTabActive(index);
      }}
    >
      <TabList
        className={classNames('flex flex-row space-x-2 overflow-x-auto')}
      >
        {tabsList.map((tab, i) => (
          <Tab
            key={i}
            className={classNames(
              'outline-none w-full font-medium inline-flex space-x-2.5 justify-center items-center leading-5 p-2.5 rounded border-2',
              tabActive == i && 'bg-baseColor-500 text-white'
            )}
          >
            <span>{tab.name}</span>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabsList.map((tab, i) => (
          <TabPanel key={i} className='pt-4'>
            {i == 0 ? (
              <div className='flex flex-col space-y-3'>
                <span>Nominal Donasi Patungan</span>
                <FormNominalComponent
                  nominalField={true}
                  quantityField={false}
                />
              </div>
            ) : (
              <div className='flex flex-col space-y-3'>
                <div className='flex space-x-2 items-center'>
                  <InformationCircleIcon className='w-4 h-4 text-baseColor-500' />
                  <span>
                    1 paket donasi lebaran senilai{' '}
                    <b className='text-baseColor-500'>
                      {formatRupiah(campaigns?.nominal.toString())}
                    </b>
                  </span>
                </div>
                <div className='flex space-y-3 items-center justify-between'>
                  <span>Jumlah Nominal</span>
                  <FormNominalComponent
                    nominalField={false}
                    quantityField={true}
                  />
                </div>
                <hr />
                <div className='flex flex-row items-center justify-between'>
                  <ShoppingBagIcon className='w-8 h-8' />
                  <div className='flex flex-col text-right font-semibold'>
                    <span>Total</span>
                    <span className='text-baseColor-500'>
                      {formatRupiah(totalNominal.toString(), 'Rp')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export const ButtonNominalComponent = () => {
  const [nominals, setNominals] = useState([75000, 175000, 200000, 450000]);

  const {
    currentNominal,
    setCurrentNominal,
    nominalButtonSelected,
    campaigns,
  } = UseTransaction();

  useEffect(() => {
    if (campaigns.template == 'T5') {
      setNominals(campaigns.nominal_choice.split(','));
    }
  }, [campaigns.template]);

  return (
    <div className='flex flex-row justify-around items-center space-x-2'>
      {nominals.map((item, i) => (
        <ButtonComponent
          key={i}
          text={`${formatRupiah(item.toString())}`}
          fullWidth={true}
          variant={
            currentNominal === formatRupiah(item.toString())
              ? 'solid'
              : 'outline'
          }
          onClick={() => nominalButtonSelected(item.toString())}
        />
      ))}
    </div>
  );
};
