import Image from 'next/image';

export default function Loading() {
  return (
    <main className='w-full md:max-w-md mx-auto min-h-screen border shadow-lg flex flex-col animate-pulse bg-white'>
      <div className='flex flex-col flex-1 items-center justify-center'>
        <Image
          src={'/assets/images/loading.gif'}
          alt='loading'
          width={50}
          height={50}
        />
      </div>
    </main>
  );
}
