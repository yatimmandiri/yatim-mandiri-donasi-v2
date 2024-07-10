import { ButtonLinkComponent } from '@/components/partials/ButtonComponent';
import Image from 'next/image';

export const TunaikanZakatComponent = () => {
  return (
    <section className='relative flex justify-between overflow-hidden items-center space-x-4 rounded-lg p-4'>
      <div className='flex flex-col space-y-4'>
        <span className='text-sm font-semibold'>
          Sucikan Harta Bersihkan Jiwa
        </span>
        <p className='w-48'>
          <span>
            Raih keberkahan dari harta yang telah disucikan dengan menunaikan
          </span>
          <span className='font-bold'> Zakat Maal</span>
        </p>
        <ButtonLinkComponent href='/zakat' text='Tunaikan Zakat' />
      </div>
      <figure className='absolute right-0 w-44'>
        <Image
          src='/assets/images/tunaikanzakat.svg'
          alt='tunaikanzakat'
          width={500}
          height={500}
          priority={true}
        />
      </figure>
    </section>
  );
};
