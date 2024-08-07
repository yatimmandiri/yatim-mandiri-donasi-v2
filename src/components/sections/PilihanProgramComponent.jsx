'use client';

import { formatRupiah } from '@/utils/formatNumber';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const PilihanProgramComponent = ({ data = [] }) => {
  return (
    <section className='flex flex-col space-y-4'>
      <span className='title-section'>Program Pilihan</span>
      <div className='block'>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2500 }}
          spaceBetween={10}
          slidesPerView={'auto'}
          loop={true}
        >
          {data?.map((item, i) => (
            <SwiperSlide key={i} className='programterbaru-swiper'>
              <PilihanProgramItemComponent
                item={item}
                priority={i == 0 ? true : false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export const PilihanProgramItemComponent = ({
  item = [],
  priority = false,
}) => {
  return (
    <Link
      href={`/${item.relationship.categories.slug}/${item.slug}`}
      className='flex flex-col rounded-md shadow-lg border overflow-hidden border-gray-200'
    >
      <figure className='relative w-full h-28'>
        <Image
          src={
            item.feature_image
              ? `${process.env.NEXT_PUBLIC_SITE_STORAGE}/${item.feature_image}`
              : '/assets/images/placeholder.jpg'
          }
          alt={item?.slug}
          fill={true}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority={priority}
        />
      </figure>
      <div className='flex flex-col justify-between h-28 p-3'>
        <span className='font-semibold line-clamp-2'>{item?.name}</span>
        <div className='block'>
          <progress
            max={100}
            value={100}
            className='h-1 w-full text-baseColor-500'
          ></progress>
          <div className='flex flex-row justify-between space-x-2 mt-1'>
            <span className='block'>Terkumpul :</span>
            <span className='font-medium block'>
              {formatRupiah(item.relationship.total_donation.toString(), 'Rp')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
