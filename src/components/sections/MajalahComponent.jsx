'use client';

import { ButtonComponent } from '@/components/partials/ButtonComponent';
import { AlertComponent } from '@/components/partials/DialogComponent';
import { UseAuth } from '@/hooks/useAuth';
import { formatRupiah } from '@/utils/formatNumber';
import classNames from 'classnames';
import { saveAs } from 'file-saver';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const MajalahComponent = () => {
  const router = useRouter();
  const [showInfak, setShowInfak] = useState(false);
  const [sedekah, setSedekah] = useState(0);
  const buttonList = ['10000', '20000', '50000', '100000'];

  const { session } = UseAuth();

  const handleDownload = async () => {
    const response = await fetch(
      `${process.env.SITE_URL}/api/backend/v1/magazines`
    );

    const responseData = await response.json();

    saveAs(`${process.env.SITE_STORAGE}/${responseData.data[0].pdf}`);
  };

  return (
    <section className='relative flex justify-between overflow-hidden items-center space-x-4 rounded-lg p-4 bg-[#fef2e8]'>
      <div className='flex flex-col space-y-4'>
        {session ? (
          <p className='text-base font-bold'>
            Ada Majalah <b className='text-baseColor-500'>Baru!</b>
          </p>
        ) : (
          <p className='text-base font-bold'>
            Dapatkan <b className='text-baseColor-500'>Update</b> Majalah
          </p>
        )}
        {session ? (
          <p className='w-56'>
            <span className='block'>Assalamualaikum</span>
            <span className='block'>
              Majalah baru bulan ini sudah bisa di unduh nih
            </span>
          </p>
        ) : (
          <p className='w-56'>
            Kamu bisa mendapatkan update majalah digital Yatim Mandiri dengan
            mendaftar sebagai donatur
          </p>
        )}
        <ButtonComponent
          text={session ? 'Unduh Majalah' : 'Daftar Donatur'}
          onClick={() =>
            session ? setShowInfak(true) : router.push('/auth/register')
          }
        />
      </div>
      <figure
        className={classNames(
          'absolute ',
          session ? '-right-8 -bottom-5 w-52' : 'right-0 bottom-0 w-44'
        )}
      >
        <Image
          src={session ? '/assets/images/pana.svg' : '/assets/images/cuate.svg'}
          alt='tunaikanzakat'
          width={500}
          height={500}
          priority={true}
        />
      </figure>
      <AlertComponent
        isOpen={showInfak}
        handleOnChange={() => setShowInfak(false)}
      >
        <div className='flex flex-col space-y-4 p-2'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col space-y-2'>
              <span className='font-bold text-left'>
                Eits, <br />
                gaperlu seratus agar berkah terus
              </span>
              <p className='text-left'>Yuk Pilih Nominal Infakmu</p>
            </div>
            <figure>
              <Image
                src={'/assets/images/infakyuk.svg'}
                alt='image'
                width={120}
                height={1200}
                priority={false}
              />
            </figure>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            {buttonList.map((item, i) => (
              <ButtonComponent
                key={i}
                text={formatRupiah(item)}
                variant={item == sedekah ? 'solid' : 'outline'}
                onClick={() => setSedekah(item)}
                fullWidth={true}
              />
            ))}
          </div>
          <div className='flex items-center justify-between space-x-4'>
            <ButtonComponent
              text='Lanjut Download'
              variant='outline'
              onClick={handleDownload}
              fullWidth={true}
            />
            <ButtonComponent
              text='Mau Infak Dulu'
              disabled={sedekah == 0 ? true : false}
              onClick={() =>
                router.push(
                  `/infak/infak-umum?formDonasi=true&nominal=${sedekah}`
                )
              }
              fullWidth={true}
            />
          </div>
        </div>
      </AlertComponent>
    </section>
  );
};
