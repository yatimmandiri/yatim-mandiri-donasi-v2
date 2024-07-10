import {
  HistoriListComponent,
  WaitingListComponent,
} from '@/components/sections/HistoriComponent';
import { DonationProvider } from '@/hooks/useDonation';
import { AppLayout } from '@/layouts/AppLayout';

export const metadata = () => {
  return {
    alternates: {
      canonical: '/histori',
    },
  };
};

export default function HistoriPage() {
  const contextValue = {
    headers: {
      logo: true,
      fixed: true,
    },
  };

  return (
    <AppLayout context={contextValue}>
      <DonationProvider>
        <div className='flex flex-col space-y-4 p-4'>
          <WaitingListComponent />
          <HistoriListComponent />
        </div>
      </DonationProvider>
    </AppLayout>
  );
}
