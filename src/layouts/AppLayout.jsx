import { HeaderComponent } from '@/components/layouts/HeaderComponent';
import { NavigationComponent } from '@/components/layouts/NavigationComponent';
import { AppProvider } from '@/hooks/useApp';
import { ToastContainer } from 'react-toastify';

export const AppLayout = ({ context = {}, children }) => {
  return (
    <AppProvider context={context}>
      <main className='wrapper flex flex-col min-h-screen'>
        <HeaderComponent />
        <div className='flex-1'>{children}</div>
        <NavigationComponent />
        <ToastContainer />
      </main>
    </AppProvider>
  );
};
