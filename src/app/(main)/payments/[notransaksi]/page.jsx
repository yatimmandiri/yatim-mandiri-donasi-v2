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
    pixel: {
      purchase: {
        content_ids: [donations.data[0].relationship.campaigns.id],
        content_type: donations.data[0].relationship.campaigns.name,
        contents: [
          {
            id: donations.data[0].no_transaksi,
            quantity: donations.data[0].quantity,
          },
        ],
        num_items: donations.data[0].quantity,
        currency: 'IDR',
        value: donations.data[0].totaldonasi,
      },
      donate: {
        content_ids: [donations.data[0].relationship.campaigns.id],
        content_name: donations.data[0].relationship.campaigns.name,
        contents: [
          {
            id: donations.data[0].no_transaksi,
            quantity: donations.data[0].quantity,
          },
        ],
        num_items: donations.data[0].quantity,
        currency: 'IDR',
        value: donations.data[0].totaldonasi,
      },
    },
    // conversationApi: {
    //   purchase: {
    //     eventName: 'ViewContent', // ViewContent, AddToCart, InitiateCheckout, Purchase etc.
    //     eventId: 'eventId', // optional, unique event id's will be generated by default
    //     emails: ['email1', 'email2'], // optional
    //     phones: ['phone1', 'phone2'], // optional
    //     firstName: 'firstName', // optional
    //     lastName: 'lastName', // optional
    //     country: 'country', // optional
    //     city: 'city', // optional
    //     zipCode: 'zipCode', // optional
    //     products: [
    //       {
    //         // optional
    //         sku: 'product123',
    //         quantity: 1,
    //       },
    //     ],
    //     value: 1000, // optional
    //     currency: 'USD', // optional
    //     enableStandardPixel: false, // default false (Require Facebook Pixel to be loaded, see step 2)
    //   },
    // },
  };
  return (
    <AppLayout context={contextValue}>
      <PaymentProvider donations={donations?.data[0]}>
        <SwitchPaymentComponent />
      </PaymentProvider>
    </AppLayout>
  );
}
