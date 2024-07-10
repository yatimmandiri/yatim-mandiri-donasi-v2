import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const CariDataComponent = () => {
  return (
    <div className='flex flex-col space-y-4 h-96 items-center justify-center'>
      <MagnifyingGlassIcon className='w-24 h-24' />
      <span className='text-sm'>Cari Data</span>
    </div>
  );
};
