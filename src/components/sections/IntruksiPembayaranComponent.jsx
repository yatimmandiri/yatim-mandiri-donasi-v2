'use client';

import { AccordionComponent } from '@/components/partials/DisclosureComponent';
import { UsePayment } from '@/hooks/usePayment';
import { useEffect, useState } from 'react';

export const IntruksiPembayaranComponent = () => {
  const { rekenings } = UsePayment();
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {}, [isActive]);

  return (
    <section className='flex flex-col space-y-4 py-2'>
      <AccordionComponent
        onClick={() => setIsActive(isActive == 0 ? null : 0)}
        isActive={isActive === 0 ? true : false}
        title={'Via ATM'}
      >
        <ul>
          <li>1. Input Kartu ATM dan PIN Anda</li>
          <li>2. Pilih Menu Transaksi Lainnya</li>
          <li>3. Pilih Transfer</li>
          <li>4. Pilih Ke Rekening</li>
          <li>5. Input Nomor Rekening</li>
          <li>6. Pilih Benar</li>
          <li>7. Pilih Ya</li>
          <li>8. Ambil bukti bayar Anda</li>
          <li>9. Selesai</li>
        </ul>
      </AccordionComponent>
      <AccordionComponent
        onClick={() => setIsActive(isActive == 1 ? null : 1)}
        isActive={isActive === 1 ? true : false}
        title={'Via Mobile Banking'}
      >
        {rekenings.token == 'echannel' ? (
          <ul>
            <li>1. Masuk Ke Livin Mandiri</li>
            <li>2. Pilih Menu Bayar</li>
            <li>3. Masukkan kode 70012 atau pilih Midtrands</li>
            <li>4. Input Nomor Virtual Account</li>
            <li>5. Lanjutkan pembayaran</li>
            <li>6. Ambil Bukti Pembayaran</li>
            <li>7. Ambil Bukti Bayar Anda</li>
            <li>8. Selesai</li>
          </ul>
        ) : (
          <ul>
            <li>1. Masuk Ke Mobile Banking</li>
            <li>2. Pilih Menu Transfer</li>
            <li>3. Pilih Virtual Account</li>
            <li>5. Input Nomor Virtual Account</li>
            <li>6. Pilih Benar</li>
            <li>7. Pilih Ya</li>
            <li>8. Ambil Bukti Bayar Anda</li>
            <li>9. Selesai</li>
          </ul>
        )}
      </AccordionComponent>
      <AccordionComponent
        onClick={() => setIsActive(isActive == 2 ? null : 2)}
        isActive={isActive === 2 ? true : false}
        title={'Via Internet Banking'}
      >
        <ul>
          <li>1. Masuk Ke Internet Banking</li>
          <li>2. Pilih Bayar</li>
          <li>3. Pilih Multi Pembayaran</li>
          <li>4. Input Transferpay Sebagai Penyedia Jasa</li>
          <li>
            5. Input Nomor (Ambil Dari Nomor Rekening Bank Yang Dipilih Oleh
            Donatur) Sebagai Kode Bayar
          </li>
          <li>6. Pilih IDR</li>
          <li>7. Klik Lanjutkan</li>
          <li>8. Bukti Bayar Ditampilkan</li>
          <li>9. Selesai</li>
        </ul>
      </AccordionComponent>
    </section>
  );
};
