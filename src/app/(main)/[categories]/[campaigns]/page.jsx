import { ButtonComponent } from '@/components/partials/ButtonComponent';
import { CartComponent } from '@/components/sections/CartComponent';
import { NominalComponent } from '@/components/sections/NominalComponent';
import { ProgramComponent } from '@/components/sections/ProgramComponent';
import { TentangProgramComponent } from '@/components/sections/TentangProgramComponent';
import { TestimonialComponent } from '@/components/sections/TestimonialComponent';
import { CampaignProvider } from '@/hooks/useCampaign';
import { TestimonialProvider } from '@/hooks/useTestimonial';
import { TransactionProvider } from '@/hooks/useTransaction';
import { AppLayout } from '@/layouts/AppLayout';
import {
  GetDataCampaign,
  GetDataRekenings,
  GetDataTestimonials,
} from '@/services/AppService';
import { formatRupiah } from '@/utils/formatNumber';
import capitalize from 'capitalize';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function DetailCampaignsPage({ params }) {
  const [campaigns] = await Promise.all([
    GetDataCampaign({
      slug: params.campaigns,
      referal: params.ref,
    }),
  ]);

  if (!campaigns.data[0]) {
    notFound();
  }

  const [testimonials, relatedCampaigns, rekeningPopuler, rekenings] =
    await Promise.all([
      GetDataTestimonials({
        per_page: 5,
        campaign_id: campaigns.data[0].id,
      }),
      GetDataCampaign({
        categories_id: campaigns.data[0].categories_id,
        status: 'Y',
      }),
      GetDataRekenings({
        populer: 'Y',
        status: 'Y',
      }),
      GetDataRekenings({
        status: 'Y',
      }),
    ]);

  const contextValue = {
    headers: {
      backButton: true,
    },
    navigation: true,
    navigationCampaign: true,
    pixel: {
      viewContent: {
        content_ids: [campaigns.data[0].id],
        contents: [{ id: campaigns.data[0].id, quantity: 1 }],
        content_category: campaigns.data[0].categories_id,
        content_name: campaigns.data[0].campaign_slug,
      },
    },
    gtm: {
      selectItem: {
        ecommerce: {
          items: {
            item_id: campaigns.data[0].id,
            item_name: campaigns.data[0].campaign_name,
            item_category: campaigns.data[0].categories_id,
          },
        },
      },
      selectItems: {
        ecommerce: {
          items: {
            item_id: campaigns.data[0].id,
            item_name: campaigns.data[0].campaign_name,
            item_category: campaigns.data[0].categories_id,
          },
        },
      },
    },
  };

  return (
    <AppLayout context={contextValue}>
      <figure className='relative w-full h-56'>
        <Image
          src={
            campaigns.data[0].feature_image
              ? `${process.env.NEXT_PUBLIC_SITE_STORAGE}/${campaigns.data[0].feature_image}`
              : '/assets/images/placeholder.jpg'
          }
          alt={campaigns.data[0].name}
          fill={true}
          priority={true}
          sizes='(max-width: 768px) 100vw'
        />
      </figure>
      <div className='relative -mt-3 z-10 rounded-t-xl bg-white flex flex-col space-y-4 p-4'>
        <ButtonComponent text={capitalize(params.categories)} color='primary' />
        <div className='block space-y-2'>
          <p className='text-sm font-semibold'>{campaigns.data[0].name}</p>
          {campaigns.data[0].template == 'T3' && campaigns.data[0].nominal && (
            <p className='text-xs'>
              {formatRupiah(campaigns.data[0].nominal.toString(), 'Rp')}/Orang
            </p>
          )}
        </div>
        <TransactionProvider
          campaigns={campaigns?.data[0]}
          rekeningPopuler={rekeningPopuler?.data[0]}
          rekenings={rekenings?.data}
        >
          <NominalComponent />
          <CartComponent />
        </TransactionProvider>
        <TentangProgramComponent campaigns={campaigns.data[0]} />
        <TestimonialProvider
          data={testimonials.data.data}
          dataTotal={testimonials.data.pagination.last_page}
          perPage={testimonials.data.pagination.per_page}
          campaigns={campaigns.data[0]}
        >
          <TestimonialComponent />
        </TestimonialProvider>
        <CampaignProvider
          data={relatedCampaigns?.data}
          loadingbottom={true}
          title={`Program Lainnya`}
        >
          <ProgramComponent />
        </CampaignProvider>
      </div>
    </AppLayout>
  );
}
