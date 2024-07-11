import Image from 'next/image';

export const BenefitItemComponent = ({ items }) => {
  return (
    <section className='border rounded-lg bg-orange-200'>
      <div className='flex flex-col justify-center items-center text-center space-y-4 p-3'>
        <Image
          src={items.image}
          alt={'benefit_image'}
          className={'w-10 h-10'}
          width={1080}
          height={1080}
          priority
        />
        <p className='w-24 font-medium'>{items.text}</p>
      </div>
    </section>
  );
};

export const BenefitComponent = () => {
  const benefit = [
    {
      id: 1,
      text: 'Terpercaya',
      image: '/assets/images/benefit_home.svg',
    },
    {
      id: 2,
      text: 'Transparan',
      image: '/assets/images/benefit_transaksi.svg',
    },
    {
      id: 3,
      text: 'Mudah & Cepat',
      image: '/assets/images/benefit_donasi.svg',
    },
  ];

  return (
    <section className='flex flex-col space-y-4'>
      <span className='title-section'>Kenapa Yatim Mandiri ?</span>
      <div className='grid grid-cols-3 gap-4'>
        {benefit?.map((items, i) => (
          <BenefitItemComponent key={i} items={items} />
        ))}
      </div>
    </section>
  );
};
