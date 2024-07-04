import { LogoComponent } from '@/components/sections/LogoComponent';
import { AppProvider } from '@/hooks/useApp';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';

export const AuthLayout = ({ context = {}, children }) => {
  return (
    <AppProvider context={context}>
      <main className='wrapper flex flex-col space-y-5 p-4'>
        <Link href='/' className='border p-2 rounded-lg w-fit'>
          <ChevronLeftIcon className='w-4 h-4' />
        </Link>
        <LogoComponent width={70} height={70} className='pt-4' />
        {children}
      </main>
      <ToastContainer />
    </AppProvider>
  );
};
