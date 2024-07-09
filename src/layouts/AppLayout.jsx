import { HeaderComponent } from '@/components/layouts/HeaderComponent';
import { AppProvider } from '@/hooks/useApp';
import { ToastContainer } from 'react-toastify';

export const AppLayout = ({ context = {}, children }) => {
  return (
    <AppProvider context={context}>
      <main className='wrapper'>
        <HeaderComponent />
        {children}
        <ToastContainer />
      </main>
    </AppProvider>
  );
};
