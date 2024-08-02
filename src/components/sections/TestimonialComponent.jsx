'use client';

import { UseTestimonial } from '@/hooks/useTestimonial';
import { formatRupiah } from '@/utils/formatNumber';
import { Button } from '@headlessui/react';
import moment from 'moment-timezone';
import Image from 'next/image';

export const TestimonialComponent = () => {
  const { result, hasMore, isLoading, loadMore } = UseTestimonial();

  return (
    <section className='flex flex-col space-y-4'>
      <span className='title-section'>Doa dan Harapan</span>
      <div className='grid grid-cols-1 gap-4'>
        {result?.map((item, i) => (
          <TestimonialItemComponent key={i} item={item} />
        ))}
      </div>
      {hasMore && (
        <Button
          onClick={() => loadMore()}
          className='text-baseColor-500 underline'
        >
          <span>{isLoading ? 'Loading...' : 'Lihat Lebih Banyak'}</span>
        </Button>
      )}
    </section>
  );
};

export const TestimonialItemComponent = ({ item = [] }) => {
  return (
    <section className='border rounded-lg p-3 flex flex-row justify-start items-start space-x-4'>
      <figure className='relative w-16 h-16 mt-2 rounded-full overflow-hidden'>
        <Image
          src={`https://ui-avatars.com/api/?name=${item.relationship.users.name}`}
          alt={'avatar'}
          loading={'eager'}
          className='border w-16 h-16 rounded-full overflow-hidden'
          style={{ objectFit: 'cover', borderRadius: 10 }}
          sizes='(max-width: 768px) 100vw'
          fill={true}
        />
      </figure>
      <div className='flex flex-col space-y-3 flex-1'>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between items-center font-semibold'>
            <span>
              {item.hamba_allah == 'Y'
                ? 'Hamba Allah'
                : item.relationship.users.name}
            </span>
            <span>{moment(item.created_at).format('DD MMM YYYY')}</span>
          </div>
          <span>
            Berdonasi sebesar {formatRupiah(item.total_donation.toString())}
          </span>
        </div>
        <blockquote className='italic'>
          <span>{item.description && `"${item.description}"`}</span>
        </blockquote>
      </div>
    </section>
  );
};
