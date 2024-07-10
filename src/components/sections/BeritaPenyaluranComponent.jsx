'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const BeritaPenyaluranComponent = ({ data = [] }) => {
  return (
    <section className='flex flex-col space-y-4'>
      <span className='title-section'>Berita Penyaluran</span>
      <div className='block'>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2500 }}
          spaceBetween={10}
          slidesPerView={2}
        >
          {data?.map((item, i) => (
            <SwiperSlide key={i}>
              <BeritaPenyaluranItemComponent
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

export const BeritaPenyaluranItemComponent = ({
  item = [],
  priority = false,
}) => {
  return (
    <Link
      target='_blank'
      href={item.link}
      className='flex flex-col rounded-md items-center shadow-lg border overflow-hidden border-gray-200'
    >
      <figure className='relative w-full h-32'>
        <Image
          src={item?.featured_image?.thumbnail}
          alt={item?.slug}
          fill={true}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority={priority}
        />
      </figure>
      <div className='block p-3'>
        <span className='font-semibold line-clamp-2'>
          {item?.title?.rendered}
        </span>
        <div className='text-xs line-clamp-3 mt-3 text-justify'>
          {item?.excerpt?.rendered}
        </div>
      </div>
    </Link>
  );
};
