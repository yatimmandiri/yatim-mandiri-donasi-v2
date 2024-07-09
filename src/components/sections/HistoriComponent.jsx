'use client';

import { ButtonComponent } from '@/components/partials/ButtonComponent';
import { ModalComponent } from '@/components/partials/DialogComponent';
import { InputSelectComponent } from '@/components/partials/InputComponent';
import { RelatedCampaignComponent } from '@/components/sections/RelatedCampaignComponent';
import { CampaignProvider } from '@/hooks/useCampaign';
import { UseDonation } from '@/hooks/useDonation';
import { copyText } from '@/utils/copyText';
import { formatRupiah } from '@/utils/formatNumber';
import {
  ArrowPathIcon,
  CheckIcon,
  DocumentDuplicateIcon,
  InformationCircleIcon,
  QrCodeIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import moment from 'moment-timezone';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaDownload, FaWhatsapp } from 'react-icons/fa';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const HistoriListComponent = () => {
  const {
    result: histori,
    status,
    statusSelected,
    setStatusSelected,
    donationSelected,
    showDonation,
    setShowDonation,
  } = UseDonation();

  return (
    <section className='flex flex-col space-y-4'>
      <div className='flex items-center justify-between'>
        <legend className='text-sm font-semibold'>
          Catatan Donasi ({histori?.length})
        </legend>
        <InputSelectComponent
          data={status}
          value={statusSelected}
          onChange={(e) => setStatusSelected(e.target.value)}
        />
      </div>
      <div className='grid grid-cols-1 gap-4'>
        {histori?.map((item, i) => (
          <CardDonasiComponent key={i} item={item} />
        ))}
      </div>

      <ModalComponent
        isOpen={showDonation}
        withHeader={true}
        modalTitle='Detail Transaksi'
        handleOnChange={() => setShowDonation(false)}
      >
        <PaymentInfoComponent
          items={donationSelected}
          status={donationSelected?.status}
        />
      </ModalComponent>
    </section>
  );
};

export const PaymentInfoComponent = ({ status = 'Pending', items = [] }) => {
  const router = useRouter();

  switch (status) {
    case 'Success':
      return (
        <div className='flex flex-col text-left'>
          <ul className='flex flex-col space-y-3 p-4'>
            <li className='flex flex-row items-center justify-between'>
              <span>Status</span>
              <StatusIconComponent status={items?.status} />
            </li>
            <li className='flex flex-row items-center justify-between'>
              <span>No Transaksi</span>
              <span>{items?.no_transaksi}</span>
            </li>
            <li className='flex flex-row items-center justify-between'>
              <span>Batas Waktu</span>
              <span>
                {moment(items?.expired ? items.expired : new Date())
                  .tz('Asia/Jakarta')
                  .format('DD MMMM YYYY hh:mm:ss')
                  .toLocaleString()}
              </span>
            </li>
          </ul>
          <hr />
          <ul className='flex flex-col space-y-3 p-4'>
            <li>
              <span className='font-semibold'>Detail Donasi</span>
            </li>
            <li className='flex flex-col space-y-1'>
              <span className='font-medium'>Nama Donatur</span>
              <span>{items?.relationship.users.name}</span>
            </li>
            <li className='flex flex-col space-y-1'>
              <span className='font-medium'>Nama Program</span>
              <span>{items?.relationship.campaigns.name}</span>
            </li>
            <li className='flex flex-col space-y-1'>
              <span className='font-medium'>Pesan dan Doa</span>
              <span>{items?.keterangan}</span>
            </li>
          </ul>
          <hr />
          <ul className='flex flex-col space-y-3 p-4'>
            <li className='flex flex-row items-center justify-between'>
              <span className='font-semibold'>Rincian Pembayaran</span>
            </li>
            <li className='flex flex-row items-center justify-between'>
              <span>Metode Pembayaran</span>
              <span>{items?.relationship.rekenings.bank}</span>
            </li>
            <li className='flex flex-row items-center justify-between'>
              <span>Nominal Donasi</span>
              <span>
                {formatRupiah(
                  items?.total_donasi ? items.total_donasi.toString() : '0',
                  'Rp. '
                )}
              </span>
            </li>
          </ul>
          <hr />
          <div className='flex space-x-4 p-4'>
            <ButtonComponent
              text='Unduh'
              leftIcon={FaDownload}
              variant='outline'
              onClick={() => alert('Sementara Tidak Tersedia')}
            />
            <ButtonComponent
              text='Donasi Kembali'
              fullWidth={true}
              onClick={() =>
                router.replace(
                  `/${items.relationship.categories[0].name.toLowerCase()}/${
                    items.relationship.campaigns.slug
                  }`
                )
              }
            />
          </div>
          <hr />
          <CampaignProvider>
            <RelatedCampaignComponent title='Program yang mungkin kamu tertarik' />
          </CampaignProvider>
        </div>
      );
    case 'Expired':
      return (
        <div className='flex flex-col text-left'>
          <ul className='flex flex-col space-y-3 p-4'>
            <li className='flex flex-row items-center justify-between'>
              <span>Status</span>
              <StatusIconComponent status={items?.status} />
            </li>
            <li className='flex flex-row items-center justify-between'>
              <span>No Transaksi</span>
              <span>{items?.no_transaksi}</span>
            </li>
            <li className='flex flex-row items-center justify-between'>
              <span>Batas Waktu</span>
              <span>
                {moment(items?.expired ? items.expired : new Date())
                  .tz('Asia/Jakarta')
                  .format('DD MMMM YYYY hh:mm:ss')
                  .toLocaleString()}
              </span>
            </li>
          </ul>
          <hr />
          <ul className='flex flex-col space-y-3 p-4'>
            <li>
              <span className='font-semibold'>Detail Donasi</span>
            </li>
            <li className='flex flex-col space-y-1'>
              <span className='font-medium'>Nama Donatur</span>
              <span>{items?.relationship.users.name}</span>
            </li>
            <li className='flex flex-col space-y-1'>
              <span className='font-medium'>Nama Program</span>
              <span>{items?.relationship.campaigns.name}</span>
            </li>
            <li className='flex flex-col space-y-1'>
              <span className='font-medium'>Pesan dan Doa</span>
              <span>{items?.keterangan}</span>
            </li>
          </ul>
          <hr />
          <ul className='flex flex-col space-y-3 p-4'>
            <li className='flex flex-row items-center justify-between'>
              <span className='font-semibold'>Rincian Pembayaran</span>
            </li>
            <li className='flex flex-row items-center justify-between'>
              <span>Metode Pembayaran</span>
              <span>{items?.relationship.rekenings.bank}</span>
            </li>
            <li className='flex flex-row items-center justify-between'>
              <span>Nominal Donasi</span>
              <span>
                {formatRupiah(
                  items?.total_donasi ? items.total_donasi.toString() : '0',
                  'Rp. '
                )}
              </span>
            </li>
          </ul>
          <hr />
          <div className='flex space-x-4 p-4'>
            <ButtonComponent
              text='Bantuan'
              leftIcon={FaWhatsapp}
              variant='outline'
              onClick={() =>
                window.open(
                  'https://wa.me/628111343577?text=Saya Ingin Bertanya?',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
            />
            <ButtonComponent
              text='Donasi Lagi'
              fullWidth={true}
              onClick={() =>
                router.replace(
                  `/${items.relationship.categories[0].name.toLowerCase()}/${
                    items.relationship.campaigns.slug
                  }`
                )
              }
            />
          </div>
          <hr />
          <CampaignProvider>
            <RelatedCampaignComponent title='Program yang mungkin kamu tertarik' />
          </CampaignProvider>
        </div>
      );
    default:
      return (
        <div className='flex flex-col text-left'>
          <ul className='flex flex-col space-y-3 p-4'>
            <li className='flex flex-row items-center justify-between'>
              <span>Status</span>
              <StatusIconComponent status={items?.status} />
            </li>
            <li className='flex flex-row items-center justify-between'>
              <span>No Transaksi</span>
              <span>{items?.no_transaksi}</span>
            </li>
            <li className='flex flex-row items-center justify-between'>
              <span>Batas Waktu</span>
              <span>
                {moment(items?.expired ? items.expired : new Date())
                  .tz('Asia/Jakarta')
                  .format('DD MMMM YYYY hh:mm:ss')
                  .toLocaleString()}
              </span>
            </li>
          </ul>
          <hr />
          <ul className='flex flex-col space-y-3 p-4'>
            <li className='flex flex-row items-center justify-between'>
              <span className='text-xs font-semibold'>Detail Pembayaran</span>
              <Link
                href={`payments/${items.no_transaksi}`}
                className='text-xs text-baseColor-500'
              >
                Lihat Rincian
              </Link>
            </li>
            <li className='flex flex-col space-y-2'>
              <span className='text-xs font-semibold'>Metode Pembayaran</span>
              <div className='flex items-center space-x-4'>
                <Image
                  className='w-24 h-16 rounded-lg'
                  src={
                    items.relationship.rekenings.icon
                      ? process.env.NEXT_PUBLIC_SITE_STORAGE +
                        items.relationship.rekenings.icon
                      : '/assets/images/placeholder.jpg'
                  }
                  alt={'logo'}
                  width={100}
                  height={100}
                  priority={true}
                />
                <div className='flex flex-col space-y-1'>
                  <span className='text-xs font-semibold'>
                    Transfer {items.relationship.rekenings.bank}
                  </span>
                  <p>A/n {items.relationship.rekenings.name}</p>
                </div>
              </div>
            </li>
            <VirtualAccountComponent items={items} />
            <li className='flex flex-col'>
              <span className='text-xs font-semibold'>Jumlah Pembayaran</span>
              <div className='flex justify-between items-center'>
                <span className='flex-1 text-lg text-baseColor-500'>
                  {formatRupiah(items.total_donasi.toString(), 'Rp. ')}
                </span>
                <ButtonComponent
                  onClick={() => copyText(items.total_donasi.toString())}
                  text='Salin'
                  variant='outline'
                  leftIcon={DocumentDuplicateIcon}
                />
              </div>
            </li>
          </ul>
          <hr />
          <div className='flex flex-col space-y-2 p-4'>
            <span className='flex space-x-1 items-center'>
              <InformationCircleIcon className='w-4 h-4' />
              <b className='font-semibold'>Penting</b>
            </span>
            <span className=''>
              Pastikan transfer tepat sampai 3 digit terakhir agar pembayaran
              terverifikasi secara automatis
            </span>
          </div>
          <hr className='border-dashed border' />
          <div className='flex flex-col text-baseColor-500'>
            <Link
              href={`payments/${items.no_transaksi}`}
              className='p-4 text-center text-xs'
            >
              Lihat Intruksi Pembayaran
            </Link>
          </div>
          <hr className='border-dashed border' />
          <CampaignProvider>
            <RelatedCampaignComponent title='Program yang mungkin kamu tertarik' />
          </CampaignProvider>
        </div>
      );
  }
};

export const VirtualAccountComponent = ({ items = [] }) => {
  const [virtualAccountNumber, setVirtualAccountNumber] = useState('');

  useEffect(() => {
    switch (items.relationship.rekenings.group) {
      case 'e_money':
        // console.log('emoney');
        break;

      default:
        switch (items.relationship.rekenings.token) {
          case 'echannel':
            setVirtualAccountNumber(
              items.relationship.rekenings.provider == 'Midtrans'
                ? items.bill_key + ` (${items.bill_code})`
                : items.relationship.rekenings.number
            );
            break;
          case 'permata':
            setVirtualAccountNumber(
              items.relationship.rekenings.provider == 'Midtrans'
                ? items.va_number
                : items.relationship.rekenings.number
            );
            break;

          default:
            setVirtualAccountNumber(
              items.relationship.rekenings.provider == 'Midtrans'
                ? items.va_number
                : items.relationship.rekenings.number
            );
            break;
        }
        break;
    }
  }, [
    items.relationship.rekenings.group,
    items.relationship.rekenings.number,
    items.relationship.rekenings.provider,
    items.relationship.rekenings.token,
    items.bill_key,
    items.bill_code,
    items.va_number,
  ]);

  switch (items.relationship.rekenings.group) {
    case 'e_money':
      return (
        <div className='flex flex-col'>
          <div className='flex flex-col space-y-1.5 p-3'>
            <div className='flex items-center space-x-2.5'>
              <QrCodeIcon className='w-12 h-12' />
              <span className='flex flex-col'>
                <span>QR Code</span>
                <span>Pembayaran</span>
              </span>
            </div>
            <p>Scan QR Code Jika Aplikasi Tidak Tersedia</p>
          </div>
          <div className='flex flex-col flex-1 items-center'>
            <Image
              className={'w-56 h-56'}
              src={items.actions[0].url}
              alt={'qrcode'}
              width={1024}
              height={1024}
              priority
            />
          </div>
        </div>
      );

    default:
      return (
        <div className='flex flex-col'>
          <span className='text-xs font-semibold'>Virtual Account</span>
          <div className='flex justify-between items-center'>
            <span className='flex-1 text-lg text-baseColor-500'>
              {virtualAccountNumber}
            </span>
            <ButtonComponent
              onClick={() => copyText(virtualAccountNumber)}
              text='Salin'
              variant='outline'
              leftIcon={DocumentDuplicateIcon}
            />
          </div>
        </div>
      );
  }
};

export const WaitingListComponent = () => {
  const { waitingList: histori } = UseDonation();

  return (
    <section className='flex flex-col space-y-4'>
      <legend className='text-sm font-semibold'>
        Menuggu Pembayaran ({histori?.length})
      </legend>
      <div className='block'>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={30}
          modules={[Autoplay, Pagination]}
        >
          {histori?.map((item, i) => (
            <SwiperSlide key={i}>
              <CardDonasiComponent item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export const CardDonasiComponent = ({ item = [] }) => {
  const router = useRouter();
  const { selectDonation } = UseDonation();

  return (
    <section
      onClick={() => selectDonation(item)}
      className='flex flex-col space-y-4 p-3 border rounded'
    >
      <div className='flex flex-row justify-between items-center space-x-3'>
        <div className='flex flex-row flex-1 items-center space-x-4'>
          <Image
            src={'/assets/images/logo_white.png'}
            alt={'logo'}
            className='w-10 h-10 rounded-lg overflow-hidden bg-baseColor-500'
            width={100}
            height={100}
            priority={true}
          />
          <div className='flex flex-col'>
            <span className='text-sm font-medium'>Nomor Invoice</span>
            <span>#{item.no_transaksi}</span>
          </div>
        </div>
        <StatusIconComponent status={item.status} />
      </div>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-col'>
          <span className='text-sm font-medium'>Batas Waktu</span>
          <span>
            {moment(item?.expired ? item.expired : Date.now())
              .tz('Asia/Jakarta')
              .format('DD MMMM YYYY hh:mm:ss')
              .toLocaleString()}
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm font-medium'>Total Pembayaran</span>
          <span>{formatRupiah(item.total_donasi.toString(), 'Rp. ')}</span>
        </div>
      </div>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-col'>
          <span className='text-sm font-medium'>Program</span>
          <span className='text-wrap w-52'>
            {item.relationship.campaigns.name}
          </span>
        </div>
        <ButtonComponent
          onClick={() =>
            router.push(
              item?.status == 'Pending'
                ? `/payments/${item.no_transaksi}`
                : `/${item.relationship.categories[0].slug}/${item.relationship.campaigns.slug}`
            )
          }
          variant='outline'
          text={item?.status == 'Pending' ? 'Bayar Sekarang' : 'Donasi Lagi'}
        />
      </div>
    </section>
  );
};

export const StatusIconComponent = ({ status = 'Pending' }) => {
  switch (status) {
    case 'Success':
      return (
        <div className='flex space-x-1 text-green-500 items-center'>
          <p>Success</p>
          <CheckIcon className='w-5 h-5 ' />
        </div>
      );
    case 'Expired':
      return (
        <div className='flex space-x-1 text-red-500 items-center'>
          <p>Expired</p>
          <XCircleIcon className='w-5 h-5 ' />
        </div>
      );
    default:
      return (
        <div className='flex space-x-1 text-yellow-500 items-center'>
          <p>Pending</p>
          <ArrowPathIcon className='w-5 h-5 ' />
        </div>
      );
  }
};
