'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Loading() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const logout = searchParams.get('logout');
  const register = searchParams.get('register');
  const masuk = searchParams.get('masuk');

  useEffect(() => {
    setTimeout(() => {}, 3000);
  }, []);

  return (
    <main className='w-full md:max-w-md mx-auto min-h-screen border shadow-lg flex flex-col animate-pulse bg-white'>
      {!register && !masuk && !logout && (
        <div className='flex flex-col flex-1 space-y-2 items-center justify-center'>
          <Image
            src={
              pathName == '/'
                ? '/assets/svg/gambar3.svg'
                : '/assets/images/loading.gif'
            }
            alt='loading'
            width={pathName == '/' ? 150 : 50}
            height={pathName == '/' ? 150 : 50}
          />
        </div>
      )}

      {register && (
        <div className='flex flex-col flex-1 space-y-2 items-center justify-center'>
          <Image
            src={'/assets/svg/gambar6.svg'}
            alt='loading'
            width={150}
            height={150}
          />
          <div className='flex flex-col items-center space-y-2'>
            <span className='text-lg font-semibold'>
              Yey! Pendaftaranmu Berhasil
            </span>
            <span>Yuk mulai menanam kbaikan untuk masa depan lebih baik</span>
          </div>
        </div>
      )}

      {logout && (
        <div className='flex flex-col flex-1 space-y-2 items-center justify-center'>
          <Image
            src={'/assets/svg/gambar5.svg'}
            alt='loading'
            width={150}
            height={150}
          />
          <div className='flex flex-col items-center space-y-2'>
            <span className='text-lg font-semibold'>Sampai Jumpa Lagi</span>
            <span>Kami selalu menunggu berbagi kebahagiaan bareng kamu lo</span>
          </div>
        </div>
      )}

      {masuk && (
        <div className='flex flex-col flex-1 space-y-2 items-center justify-center'>
          <Image
            src={'/assets/svg/gambar4.svg'}
            alt='loading'
            width={150}
            height={150}
          />
          <div className='flex flex-col items-center space-y-2'>
            <span className='text-lg font-semibold'>
              Selamat Datang Kembali
            </span>
            <span>Kami merindukan berbagi kebahagiaan bersamamu</span>
          </div>
        </div>
      )}
    </main>
  );
}
