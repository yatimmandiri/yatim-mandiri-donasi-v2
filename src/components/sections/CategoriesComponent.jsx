'use client';

import Image from 'next/image';
import Link from 'next/link';

export const CategoriesComponent = ({ data = [], title = false }) => {
  return (
    <section className='flex flex-col space-y-4'>
      {title && <span className='title-section'>{title}</span>}
      <div className='grid grid-cols-4 gap-4'>
        {data?.map((item, i) => (
          <CategoriesItemComponent
            key={i}
            name={item.name}
            link={'/' + item.slug}
            image={
              item.icons
                ? `${process.env.NEXT_PUBLIC_SITE_STORAGE}/${item.icons}`
                : '/assets/images/placeholder.jpg'
            }
            priority={i == 0 ? true : false}
          />
        ))}
        {data?.length <= 7 && (
          <CategoriesItemComponent
            name={'Semua'}
            link={'/kategori'}
            image={'/assets/images/semua.svg'}
            priority={true}
          />
        )}
      </div>
    </section>
  );
};

export const CategoriesItemComponent = ({
  name = 'Menu',
  link = '#',
  image = false,
  priority = false,
}) => {
  return (
    <Link
      href={link}
      className='flex flex-col space-y-1 items-center justify-center hover:scale-105 hover:font-semibold'
    >
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        priority={true}
        className='rounded-full w-16 h-16 aspect-16'
      />
      <span>{name}</span>
    </Link>
  );
};
