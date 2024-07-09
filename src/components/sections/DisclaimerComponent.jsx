'use client';

import { UseKalkulator } from '@/hooks/useKalkulator';
import { formatRupiah } from '@/utils/formatNumber';
import moment from 'moment-timezone';

export const DisclaimerComponent = () => {
  const { currentHargaEmas, nishabPerbulan, nishabPertahun } = UseKalkulator();

  return (
    <div className='flex flex-col space-y-2'>
      <span className='text-sm font-semibold'>Disclaimer !!</span>
      <ul className='list-disc space-y-0.5 flex flex-col px-4'>
        <li className='list-item'>
          <span>
            Harga emas per gram saat ini{' '}
            <b>
              {formatRupiah(
                currentHargaEmas?.current_price_gold.toString(),
                'Rp'
              )}
            </b>
          </span>
        </li>
        <li className='list-item'>
          <span>
            Nishab 85 gram per Bulan{' '}
            <b>{formatRupiah(nishabPerbulan.toString(), 'Rp')}</b>
          </span>
        </li>
        <li className='list-item'>
          <span>
            Nishab 85 gram per Tahun{' '}
            <b>{formatRupiah(nishabPertahun.toString(), 'Rp')}</b>
          </span>
        </li>
      </ul>
      <div>
        <span>
          Updated at{' '}
          <b className='font-semibold'>
            {moment(currentHargaEmas?.updated_price_gold)
              .tz('Asia/Jakarta')
              .format('DD MMMM YYYY')}
          </b>{' '}
          from harga-emas.org
        </span>
      </div>
    </div>
  );
};
