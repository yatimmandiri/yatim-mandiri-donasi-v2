'use client';

import { ButtonComponent } from '@/components/partials/ButtonComponent';
import { ActionSheetComponent } from '@/components/partials/DialogComponent';
import { InputTextComponent } from '@/components/partials/InputComponent';
import { UseCampaign } from '@/hooks/useCampaign';
import { formatRupiah } from '@/utils/formatNumber';
import { Button } from '@headlessui/react';
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SkeletonCardComponent } from '../partials/SkeletonComponent';
import { CariDataComponent } from './CariDataComponent';
import { NotFoundComponent } from './NotFoundComponent';

export const ProgramComponent = ({ categories = [] }) => {
  const {
    result: data,
    titleSection,
    searchValue,
    infinite,
    loadMore,
    hasMore,
    isLoading,
    searching,
    empty,
    initialSearch,
    loadingbottom,
    pencarian,
  } = UseCampaign();

  return (
    <section className='flex flex-col space-y-4'>
      {searching && <ProgramSearchComponent categories={categories} />}
      {titleSection && <span className='title-section'>{titleSection}</span>}
      {empty && searchValue != '' && data?.length == 0 && !isLoading && (
        <NotFoundComponent />
      )}
      {initialSearch &&
        searchValue == '' &&
        data?.length == 0 &&
        !isLoading && <CariDataComponent />}

      {infinite ? (
        <InfiniteScroll
          dataLength={data?.length}
          hasMore={hasMore}
          next={() => loadMore()}
          loader={Array.from({ length: 2 }).map((_, i) => (
            <SkeletonCardComponent key={i} />
          ))}
          className='grid grid-cols-1 gap-4'
        >
          {!pencarian &&
            data.map((item, i) => (
              <ProgramItemComponent
                key={i}
                item={item}
                priority={i == 0 ? true : false}
              />
            ))}
          {isLoading &&
            Array.from({ length: 2 }).map((_, i) => (
              <SkeletonCardComponent key={i} />
            ))}
          {/* {isLoading &&
            !loadingbottom &&
            Array.from({ length: 2 }).map((_, i) => (
              <SkeletonCardComponent key={i} />
            ))}
          {isLoading && loadingbottom && (
            <>
              {data.map((item, i) => (
                <ProgramItemComponent
                  key={i}
                  item={item}
                  priority={i == 0 ? true : false}
                />
              ))}
              {Array.from({ length: 2 }).map((_, i) => (
                <SkeletonCardComponent key={i} />
              ))}
            </>
          )} */}
        </InfiniteScroll>
      ) : (
        <div className='grid grid-cols-1 gap-4'>
          {data.map((item, i) => (
            <ProgramItemComponent
              key={i}
              item={item}
              priority={i == 0 ? true : false}
            />
          ))}
          {isLoading &&
            loadingbottom &&
            Array.from({ length: 2 }).map((_, i) => (
              <SkeletonCardComponent key={i} />
            ))}
        </div>
      )}
      {!infinite && !isLoading && hasMore && (
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

export const ProgramFilterComponent = ({ categories = [] }) => {
  const {
    showFilter,
    setShowFilter,
    resetSelected,
    selectCategories,
    categoriesSelected,
    filter,
    removeSelected,
    resetAll,
  } = UseCampaign();

  return (
    <>
      {/* {categoriesSelected?.length > 0 && (
        <div className='flex justify-between items-center'>
          <span className='title-section'>Filter By Categories</span>
          <span
            onClick={() => resetAll()}
            className='text-red-500 font-semibold'
          >
            Reset
          </span>
        </div>
      )}
      <div className='flex'>
        {categoriesSelected.map((item, i) => (
          <ButtonComponent
            onClick={() => removeSelected(item.name)}
            key={i}
            text={item.name}
          />
        ))}
      </div> */}
    </>
  );
};

export const ProgramSearchComponent = ({ categories = [] }) => {
  const {
    result: data,
    searching,
    filtering,
    searchValue,
    filterSearch,
    setShowFilter,
    showFilter,
    resetSelected,
    selectCategories,
    categoriesSelected,
    filter,
    removeSelected,
    resetAll,
  } = UseCampaign();

  return (
    searching && (
      <div className='flex flex-col space-y-4'>
        <div className='flex items-center justify-between space-x-4'>
          <div className='flex-1'>
            <InputTextComponent
              addonLeft={MagnifyingGlassIcon}
              placeholder='Pencarian...'
              onKeyUp={(e) => filterSearch(e.target.value)}
            />
          </div>
          {filtering && (
            <AdjustmentsVerticalIcon
              onClick={() => setShowFilter(true)}
              className='w-5 h-5 cursor-pointer'
            />
          )}
        </div>
        {searchValue != '' && (
          <span>
            {data?.length} Hasil pencarian dengan kata kunci{' '}
            <b className='uppercase'>{searchValue}</b>{' '}
            {data?.length == 0 && 'tidak'} ditemukan
          </span>
        )}
        {categoriesSelected?.length > 0 && (
          <div className='flex justify-between items-center'>
            <span className='title-section'>Filter By Categories</span>
            <span
              onClick={() => resetAll()}
              className='text-red-500 cursor-pointer font-semibold'
            >
              Reset
            </span>
          </div>
        )}
        {categoriesSelected?.length > 0 && (
          <div className='flex flex-row space-x-3 overflow-x-auto'>
            {categoriesSelected.map((item, i) => (
              <ButtonComponent
                onClick={() => removeSelected(item.name)}
                key={i}
                text={item.name}
              />
            ))}
          </div>
        )}
        <ActionSheetComponent
          isOpen={showFilter}
          handleOnChange={() => setShowFilter(!showFilter)}
        >
          <div className='flex flex-col justify-between rounded-t-xl h-72 overflow-y-auto scrollbar-hide'>
            <div className='flex justify-between sticky top-0 p-4 bg-white'>
              <div className='flex items-center space-x-2'>
                <AdjustmentsVerticalIcon className='w-5 h-5' />
                <span className='font-medium'>Filter Program</span>
              </div>
              <span
                onClick={() => resetSelected()}
                className='text-red-500 font-medium cursor-pointer'
              >
                Reset
              </span>
            </div>
            <div className='grid grid-cols-3 gap-4 px-4'>
              {categories.map((item, i) => (
                <ButtonComponent
                  key={i}
                  text={item.name}
                  onClick={() => selectCategories(item)}
                  variant={
                    categoriesSelected.some((items) => item.name == items.name)
                      ? 'solid'
                      : 'outline'
                  }
                  color='default'
                  fullWidth={true}
                />
              ))}
            </div>
            <div className='sticky bottom-0 z-30 px-4 py-2 shadow bg-white'>
              <ButtonComponent
                onClick={() => filter()}
                text='Filter'
                color='primary'
                fullWidth={true}
              />
            </div>
          </div>
        </ActionSheetComponent>
      </div>
    )
  );
};

export const ProgramItemComponent = ({ item = [], priority = false }) => {
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
