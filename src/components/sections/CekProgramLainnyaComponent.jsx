import { ButtonLinkComponent } from '@/components/partials/ButtonComponent';
import Image from 'next/image';

export const CekProgramLainnyaComponent = () => {
  return (
    <section className='relative flex justify-between overflow-hidden space-x-4 p-4 bg-blue-500 text-white'>
      <div className='flex flex-col space-y-3 w-56'>
        <span className='text-sm font-semibold'>
          Cek Program-Program Menarik di Yatim Mandiri
        </span>
        <span>
          Bersama-sama memandirikan yatim dan dhuafa dengan ragam program yang
          dihadirkan Yatim Mandiri
        </span>
        <ButtonLinkComponent href='/program' text='Lihat Program' />
      </div>
      <div className='rounded-full w-52 h-52 flex items-end absolute -right-14 -top-4 bottom-0 z-10 bg-gray-200'></div>
      <div className='rounded-full w-52 h-52 flex items-end absolute -right-16 -top-4 bottom-0 z-10 bg-white'></div>
      <figure className='w-60 -right-16 bottom-4 absolute z-30'>
        <Image
          src='/assets/images/cekprogramlainnya.svg'
          alt='tunaikanzakat'
          width={500}
          height={500}
          priority={true}
        />
      </figure>
    </section>
  );
};
