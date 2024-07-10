import { CircleStackIcon } from '@heroicons/react/24/outline';

export const NotFoundComponent = () => {
  return (
    <div className='flex flex-col space-y-4 h-96 items-center justify-center'>
      <CircleStackIcon className='w-24 h-24' />
      <span className='text-sm'>Data Not Found</span>
    </div>
  );
};
