import { SwitchPaymentComponent } from '@/components/sections/DetailPaymentComponent';
import { PaymentProvider } from '@/hooks/usePayment';
import { AppLayout } from '@/layouts/AppLayout';
import { GetDataDonation } from '@/services/AppService';
import { notFound } from 'next/navigation';

export default async function DetailTransaksiPage({ params }) {
  const [donations] = await Promise.all([
    GetDataDonation({
      search: params.notransaksi,
    }),
  ]);

  if (!donations.data[0]) {
    notFound();
  }

  const contextValue = {
    headers: {
      logo: true,
      fixed: true,
    },
    pages: true,
  };
  return (
    <AppLayout context={contextValue}>
      <PaymentProvider donations={donations?.data[0]}>
        <SwitchPaymentComponent />
      </PaymentProvider>
    </AppLayout>
  );
}
