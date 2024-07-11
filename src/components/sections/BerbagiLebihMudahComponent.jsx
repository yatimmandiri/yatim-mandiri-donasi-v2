import Image from 'next/image';

export const BerbagiLebihMudahComponent = () => {
  return (
    <section className='relative bg-white text-center text-white h-36 rounded-lg flex overflow-hidden'>
      <div className='rounded-r-lg w-20 -left-5 flex items-end justify-end'>
        <Image
          src={'/assets/images/donation.svg'}
          alt='donation'
          width={500}
          height={500}
          className='absolute z-10 -left-0 w-32 h-32 bottom-0'
        />
      </div>
      <div className='flex flex-col space-y-6 flex-1 p-4 bg-baseColor-500 rounded-l-lg'>
        <span className='text-sm text-left font-bold'>
          Berbagi semakin mudah
        </span>
        <ul className='flex flex-row justify-around items-center pl-7 pb-4'>
          <li className='flex flex-col space-y-2 items-center'>
            <Image
              src='/assets/images/ymfaqs.svg'
              alt='tunaikanzakat'
              width={200}
              height={480}
              className='rounded-full h-10 w-10'
            />
            <span>Buka Website</span>
          </li>
          <li className='flex flex-col space-y-2 items-center'>
            <Image
              src='/assets/images/pilihprogram.svg'
              alt='tunaikanzakat'
              width={200}
              height={480}
              className='rounded-full h-10 w-10'
            />
            <span>Pilih Program</span>
          </li>
          <li className='flex flex-col space-y-2 items-center'>
            <Image
              src='/assets/images/bayardonasi.svg'
              alt='tunaikanzakat'
              width={200}
              height={480}
              className='rounded-full h-10 w-10'
            />
            <span>Bayar Donasi</span>
          </li>
        </ul>
      </div>
    </section>
  );
};
