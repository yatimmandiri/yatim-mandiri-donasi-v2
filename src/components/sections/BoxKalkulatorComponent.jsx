import Image from 'next/image';

export const BoxKalkulatorComponent = () => {
  return (
    <section className='relative flex items-center justify-between overflow-hidden w-full border shadow rounded-lg bg-white'>
      <div className='flex flex-col space-y-2 p-4'>
        <span className='text-base w-36 font-bold'>
          Tunaikan Zakat Bertabur Manfaat
        </span>
        <p className='w-56'>
          Sucikan harta dengan berzakat untuk jiwa lebih tenang serta bermanfaat
          membahagiakan sesama
        </p>
      </div>
      <Image
        src={'/assets/images/vektor1.svg'}
        alt='image'
        width={150}
        height={300}
        className='h-36 absolute -right-6 z-10'
        priority={true}
        style={{ width: 'auto' }}
      />
      <Image
        src={'/assets/images/paymentzakat.svg'}
        alt='image'
        width={150}
        height={300}
        className='h-36 absolute -right-12 -bottom-8 z-20'
        priority={true}
        style={{ width: 'auto' }}
      />
    </section>
  );
};
