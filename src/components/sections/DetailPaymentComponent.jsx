'use client';

import {
  ButtonComponent,
  ButtonIconComponent,
} from '@/components/partials/ButtonComponent';
import { ModalComponent } from '@/components/partials/DialogComponent';
import { UsePayment } from '@/hooks/usePayment';
import { copyText } from '@/utils/copyText';
import { formatRupiah } from '@/utils/formatNumber';
import { useCoolDownTimer } from '@/utils/useCoolDownTimer';
import {
  CheckCircleIcon,
  DocumentDuplicateIcon,
  InformationCircleIcon,
  LinkIcon,
  QrCodeIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { FaWhatsapp } from 'react-icons/fa';
import { IntruksiPembayaranComponent } from './IntruksiPembayaranComponent';

export const DetailPaymentComponent = () => {
  const { donations } = UsePayment();
  return (
    <section className='flex flex-col flex-1'>
      <div className='flex flex-col space-y-4 p-4'>
        <span className='text-sm font-semibold'>Detail Pembayaran</span>
        <PaymentInfoComponent />
      </div>
      {donations?.relationship.rekenings.group != 'e_money' && (
        <div className='flex flex-col p-4'>
          <span className='text-sm font-semibold'>Intruksi Pembayaran</span>
          <IntruksiPembayaranComponent />
        </div>
      )}
    </section>
  );
};

export const PaymentInfoComponent = () => {
  const router = useRouter();
  const { donations, rekenings } = UsePayment();

  switch (rekenings.group) {
    case 'e_money':
      if (
        isMobile &&
        donations?.deep_links != null &&
        donations?.status == 'Pending'
      ) {
        router.push(donations?.deep_links);
      }

      return (
        <div className='flex flex-col space-y-8'>
          <div className='flex flex-col space-y-1'>
            <div className='flex flex-row justify-between items-start space-x-2'>
              <div className='flex flex-row items-center'>
                <QrCodeIcon className='w-12 h-12' />
                <div className='flex flex-col'>
                  <span>QR Code</span>
                  <span>Pembayaran</span>
                </div>
              </div>
              <ButtonComponent text='Unduh QRIS' />
            </div>
            <span className='text-xs'>
              Scan QR Code Jika Aplikasi Tidak Tersedia
            </span>
          </div>
          <div className='flex flex-col items-center space-y-4'>
            <span className='font-bold'>
              {formatRupiah(donations?.total_donasi.toString(), 'Rp')}
            </span>
            <Image
              className={'w-56 h-56'}
              src={
                donations.qr_code
                  ? donations.qr_code
                  : '/assets/images/placeholder.jpg'
              }
              alt={'qrcode'}
              width={1024}
              height={1024}
              priority={true}
            />
          </div>
          <div
            className='w-full rounded p-1.5 inline-flex justify-between items-center px-3 bg-blue-100'
            onClick={() =>
              window.open(donations.deep_links, '_blank', 'noopener,noreferrer')
            }
          >
            <div className='flex items-center space-x-4'>
              <Image
                className='w-12 h-8'
                src={
                  rekenings.icon
                    ? process.env.BACKEND_STORAGE + rekenings.icon
                    : '/assets/images/placeholder.jpg'
                }
                alt={'logo'}
                width={100}
                height={100}
                priority
              />
              <span className='font-semibold'>Yatim Mandiri</span>
            </div>
            <LinkIcon
              className='w-5 h-5'
              onClick={() => router.push(donations?.deep_links)}
            />
          </div>
        </div>
      );
    default:
      return (
        <div className='flex flex-col space-y-6'>
          <div className='flex space-x-2 items-center'>
            <Image
              className='w-16 h-10'
              src={
                rekenings.icon
                  ? process.env.NEXT_PUBLIC_SITE_STORAGE + rekenings.icon
                  : '/assets/images/placeholder.jpg'
              }
              alt={rekenings.bank}
              width={100}
              height={100}
              priority
            />
            <div className='flex flex-col space-y-1.5'>
              <span className='font-semibold'>{rekenings.bank}</span>
              <span>A/n {rekenings.name}</span>
            </div>
          </div>
          <div className='flex justify-between items-end'>
            <div className='flex flex-col space-y-1.5'>
              <span className='font-semibold text-sm'>Nomor Rekening</span>
              <span className='text-blue-600 text-base'>
                {donations.va_number}{' '}
                {donations.bill_code != '' && <>({donations.bill_code})</>}
              </span>
            </div>
            <div className='flex items-center space-x-2.5 text-baseColor-500'>
              <ButtonComponent
                onClick={() => copyText(donations.va_number)}
                leftIcon={DocumentDuplicateIcon}
                variant='outline'
                text='Salin'
              />
            </div>
          </div>
          <div className='flex justify-between items-end'>
            <div className='flex flex-col space-y-1.5'>
              <span className='font-semibold text-sm'>Total Donasi</span>
              <span className='text-blue-600 text-base'>
                {formatRupiah(donations?.total_donasi.toString(), 'Rp')}
              </span>
            </div>
            <div className='flex items-center space-x-2.5 text-baseColor-500'>
              <ButtonComponent
                onClick={() =>
                  copyText(formatRupiah(donations?.total_donasi.toString()))
                }
                leftIcon={DocumentDuplicateIcon}
                variant='outline'
                text='Salin'
              />
            </div>
          </div>
        </div>
      );
  }
};

export const SwitchPaymentComponent = () => {
  const { donations, tanggalexpired } = UsePayment();
  const { expired } = useCoolDownTimer(tanggalexpired);

  switch (donations.status) {
    case 'Expired':
      return <ExpiredComponent />;
    case 'Success':
      return <SettlementComponent />;
    default:
      return expired ? (
        <ExpiredComponent />
      ) : (
        <div className='flex flex-col min-h-screen'>
          <BoxTimerComponent />
          <DetailPaymentComponent />
          <NavigationPaymentComponent />
        </div>
      );
  }
};

export const BoxTimerComponent = () => {
  const { tanggalexpired } = UsePayment();
  const { days, hours, minutes, seconds } = useCoolDownTimer(tanggalexpired);

  return (
    <header className='flex flex-col space-y-4 h-48 items-center justify-center bg-blue-600 text-white'>
      <div className='flex flex-col space-y-2 items-center'>
        <span className='text-xs'>Sisa Waktu Pembayaran</span>
        <span className='text-base'>
          {days} : {hours} : {minutes} : {seconds}
        </span>
      </div>
      <div className='flex flex-col space-y-2 items-center'>
        <span className='text-xs'>Batas Akhir Pembayaran</span>
        <span className='text-base'>{tanggalexpired}</span>
      </div>
    </header>
  );
};

export const NavigationPaymentComponent = () => {
  const router = useRouter();
  const [showStatus, setShowStatus] = useState(false);
  const { donations, virtualAccount, tanggalexpired } = UsePayment();

  return (
    <div className='sticky bottom-0 z-30 shadow p-4 border-t flex flex-row items-center space-x-2 bg-white'>
      <ButtonIconComponent
        icons={FaWhatsapp}
        variant='outline'
        pill={false}
        onClick={() =>
          window.open(
            'https://wa.me/628111343577?text=Saya Ingin Bertanya?',
            '_blank',
            'noopener,noreferrer'
          )
        }
      />
      <ButtonComponent
        onClick={() => setShowStatus(true)}
        text='Status Pembayaran'
        fullWidth={true}
        variant='outline'
      />
      <ButtonComponent
        text='Program Lainnya'
        fullWidth={true}
        onClick={() => router.replace('/')}
      />

      <ModalComponent
        withHeader={true}
        modalTitle='Status Pembayaran'
        isOpen={showStatus}
        handleOnChange={() => setShowStatus(false)}
      >
        <div className='flex flex-col space-y-8 p-4 text-left'>
          <div className='flex flex-col justify-center items-center space-y-3'>
            <InformationCircleIcon className='w-24 h-24 text-yellow-400' />
            <span className='text-sm font-semibold'>Lakukan Pembayaran</span>
            <span className='text-xs font-semibold'>
              Segera Lakukan Transfer Sebelum
            </span>
            <span className='text-sm font-semibold text-red-500'>
              {tanggalexpired} WIB
            </span>
          </div>
          <ul className='text-sm flex flex-col space-y-4'>
            <li className='flex justify-between items-center pb-2 border-b'>
              <span className='font-semibold'>No Transaksi</span>
              <span>{donations?.no_transaksi}</span>
            </li>
            <li className='flex justify-between items-center pb-2 border-b'>
              <span className='font-semibold'>Jumlah Donasi</span>
              <span onClick={() => copyText(donations?.total_donasi)}>
                {formatRupiah(donations?.total_donasi.toString(), 'Rp')}
              </span>
            </li>
            <li className='flex justify-between items-center pb-2 border-b'>
              <span className='font-semibold'>Metode Pembayaran</span>
              <span>{donations?.relationship.rekenings.bank}</span>
            </li>
            <li className='flex justify-between items-center pb-2 border-b'>
              <span className='font-semibold'>Virtual Account</span>
              <span
                className='cursor-pointer text-baseColor-500 font-semibold'
                onClick={() => copyText(donations?.va_number)}
              >
                {donations?.va_number}
              </span>
            </li>
            <li className='flex justify-between items-center pb-2 border-b'>
              <span className='font-semibold'>Status Pembayaran</span>
              <span>{donations?.status}</span>
            </li>
          </ul>
        </div>
      </ModalComponent>
    </div>
  );
};

export const ExpiredComponent = () => {
  const router = useRouter();

  return (
    <section className='flex flex-col h-screen space-y-4 items-center justify-center'>
      <div className='flex flex-col justify-center items-center space-y-2 font-semibold'>
        <span className='text-sm'>Expired</span>
        <span>Transaction is Expired ...!!</span>
      </div>
      <XCircleIcon className='w-24 h-24 text-red-400' />
      <div className='flex flex-col items-center justify-center space-y-4 font-semibold'>
        <span className='text-sm'>Silahkan Ulangi Berdonasi</span>
        <span>Di Yatim Mandiri</span>
      </div>
      <ButtonComponent
        onClick={() => router.replace('/')}
        text={'Cek Program Donasi Lainnya'}
        pill={true}
      />
    </section>
  );
};

export const SettlementComponent = () => {
  const router = useRouter();

  return (
    <section className='flex flex-col h-screen space-y-4 items-center justify-center'>
      <div className='flex flex-col justify-center items-center space-y-2 font-semibold'>
        <span className='text-sm'>Alhamdulillah</span>
        <span>Pembayaran donasi kamu berhasil ...!!</span>
      </div>
      <CheckCircleIcon className='w-24 h-24 text-green-400' />
      <div className='flex flex-col items-center justify-center space-y-4 font-semibold'>
        <span className='text-sm'>Terima kasih telah berdonasi</span>
        <span>Di Yatim Mandiri</span>
      </div>
      <div className='flex flex-col space-y-3 w-64'>
        <ButtonComponent
          onClick={() => alert('Comming Soon')}
          text={'Cetak Kwitansi'}
          pill={true}
          fullWidth={true}
        />
        <ButtonComponent
          onClick={() => router.replace('/')}
          text={'Cek Program Donasi Lainnya'}
          pill={true}
          fullWidth={true}
        />
      </div>
    </section>
  );
};
