'use client';

import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const SliderComponent = ({ data = [] }) => {
  return (
    <div className='block'>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2500 }}
        spaceBetween={20}
        loop={true}
        slidesPerView={'auto'}
        centeredSlides={true}
        pagination={true}
      >
        {data?.map((item, i) => (
          <SwiperSlide key={i} className='slider-swiper'>
            <SliderItemComponent item={item} priority={i == 0 ? true : false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const SliderItemComponent = ({ item = [], priority = false }) => {
  return (
    <figure className='slider-item'>
      <div className='slider-image'>
        <Image
          src={
            item?.feature_image
              ? `${process.env.NEXT_PUBLIC_SITE_STORAGE}/${item?.feature_image}`
              : `/assets/images/placeholder.jpg`
          }
          alt={item?.name}
          priority={priority}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          fill={true}
        />
      </div>
    </figure>
  );
};
