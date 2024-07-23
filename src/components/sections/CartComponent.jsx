'use client';

import { ModalComponent } from '@/components/partials/DialogComponent';
import { UseTransaction } from '@/hooks/useTransaction';
import { formatRupiah } from '@/utils/formatNumber';
import { FormDonasiComponent } from '../forms/FormDonasiComponent';
import { FormRekeningComponent } from '../forms/FormRekeningComponent';

export const CartComponent = () => {
  const {
    showFormDonasi,
    setShowFormDonasi,
    showFormRekening,
    setShowFormRekening,
    currentNominal,
    totalNominal,
    currentQuantity,
    rekenings,
  } = UseTransaction();

  return (
    <div className='flex flex-col'>
      <ModalComponent
        modalTitle='Form Donasi'
        withHeader={true}
        isOpen={showFormDonasi}
        handleOnChange={() => setShowFormDonasi(false)}
      >
        <div className='flex flex-col space-y-4 text-left'>
          <div className='flex flex-col space-y-2 px-4 pt-4 pb-2'>
            <span className='font-semibold text-sm'>Jumlah Donasi</span>
            <div className='flex items-center justify-between font-semibold rounded-lg p-2 bg-gray-200'>
              <span className=' '>
                {formatRupiah(currentNominal, 'Rp')} x {currentQuantity}
              </span>
              <span className=''>
                = {formatRupiah(totalNominal.toString(), 'Rp')}
              </span>
            </div>
          </div>
          <FormDonasiComponent />
        </div>
      </ModalComponent>
      <ModalComponent
        modalTitle='Pilih Metode Pembayaran'
        withHeader={true}
        isOpen={showFormRekening}
        handleOnChange={() => setShowFormRekening(false)}
      >
        <div className='flex flex-col space-y-4 text-left p-4'>
          <div className='flex flex-col'>
            <span className='font-semibold text-sm'>Metode Pembayaran</span>
            <span>Pilih Metode Pembayaran Sesuai Kebutuhanmu</span>
          </div>
          <FormRekeningComponent />
        </div>
      </ModalComponent>
    </div>
  );
};
