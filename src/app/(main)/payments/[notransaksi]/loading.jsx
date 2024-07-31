'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function LoadingPayment() {
  useEffect(() => {
    setTimeout(() => {}, 5000);
  }, []);

  return (
    <main className='w-full md:max-w-md mx-auto min-h-screen border shadow-lg flex flex-col animate-pulse bg-white'>
      <div className='flex flex-col flex-1 space-y-2 items-center justify-center'>
        <Image
          src={'/assets/images/gambar2.svg'}
          alt='loading'
          width={250}
          height={250}
        />
        <div className='flex flex-col items-center space-y-2'>
          <span className='text-lg font-semibold'>Pembayaran disiapkan</span>
          <span>Tunggu sebentar ya... Pembayaranmu sedang disiapkan</span>
        </div>
      </div>
    </main>
  );
}
