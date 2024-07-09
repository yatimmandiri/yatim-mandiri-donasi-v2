'use client';

import { UseCampaign } from '@/hooks/useCampaign';
import { formatRupiah } from '@/utils/formatNumber';
import Image from 'next/image';
import Link from 'next/link';

export const RelatedCampaignComponent = ({ title = false }) => {
  const { resultRelated } = UseCampaign();

  return (
    <section className='flex flex-col space-y-4 p-4'>
      {title && <span className='title-section'>{title}</span>}
      <div className='grid grid-cols-1 gap-4'>
        {resultRelated.map((item, i) => (
          <RelatedCampaignItemComponent
            key={i}
            item={item}
            priority={i == 0 ? true : false}
          />
        ))}
      </div>
    </section>
  );
};

export const RelatedCampaignItemComponent = ({
  item = [],
  priority = false,
}) => {
  return (
    <Link
      target='_blank'
      href={'/' + item.relationship.categories.slug + '/' + item.slug}
      className='flex flex-row space-x-3 items-start justify-center rounded-lg overflow-hidden border shadow-md p-2'
    >
      <figure className='relative object-center overflow-hidden w-1/2 h-32'>
        <Image
          src={
            item.feature_image
              ? `${process.env.NEXT_PUBLIC_SITE_STORAGE}/${item.feature_image}`
              : '/assets/images/placeholder.jpg'
          }
          alt={item?.name}
          fill={true}
          priority={true}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-center object-cover rounded'
        />
      </figure>
      <div className='flex flex-col flex-1 justify-between space-y-4 h-32'>
        <span className='font-semibold text-xs'>{item?.name}</span>
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
