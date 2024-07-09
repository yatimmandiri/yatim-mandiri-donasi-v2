'use client';

import { UseBlog } from '@/hooks/useBlog';

import {
  CardHorizontalComponent,
  CardStackedComponent,
} from '@/components/partials/CardComponent';
import { InputTextComponent } from '@/components/partials/InputComponent';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';

export const BlogComponent = () => {
  const {
    result: data,
    hasMore,
    filterSearch,
    loadMore,
    isLoading,
  } = UseBlog();

  return (
    <div className='flex flex-col space-y-4'>
      <InputTextComponent
        type='search'
        placeholder='Pencarian...'
        addonLeft={MagnifyingGlassIcon}
        onKeyUp={(e) => filterSearch(e.target.value)}
      />
      <InfiniteScroll
        dataLength={data.length}
        hasMore={hasMore}
        next={loadMore}
        loader={<span className='text-xs text-center'>Loading...</span>}
        className='grid grid-cols-1 gap-4'
      >
        {data.map((item, i) =>
          i == 0 ? (
            <CardStackedComponent
              key={i}
              title={item?.title.rendered}
              excerpt={item?.excerpt.rendered}
              link={item?.link}
              image={item?.featured_image?.large}
              priority={true}
            />
          ) : (
            <CardHorizontalComponent
              key={i}
              title={item?.title.rendered}
              link={item?.link}
              image={item?.featured_image?.large}
            />
          )
        )}
      </InfiniteScroll>
    </div>
  );
};

export const BlogItemComponent = ({
  item = [],
  index = 0,
  priority = false,
}) => {
  return (
    <Link
      target='_blank'
      href={item?.link}
      className={classNames(
        'flex items-center rounded-lg overflow-hidden border shadow-md',
        index == 0 ? 'flex-col' : 'flex-row space-x-3'
      )}
    >
      <figure
        className={classNames(
          'relative object-center overflow-hidden',
          index == 0 ? 'w-full h-64' : 'w-96 h-32'
        )}
      >
        <Image
          src={item?.featured_image?.large}
          alt={item?.title.rendered}
          fill={true}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority={priority}
          className='object-cover object-center'
        />
      </figure>
      <div className='flex flex-col space-y-4 p-4'>
        <span className='font-semibold text-sm'>{item?.title.rendered}</span>
        <span
          className={classNames('line-clamp-3 text-xs', index != 0 && 'hidden')}
        >
          {item?.excerpt.rendered}
        </span>
      </div>
    </Link>
  );
};
