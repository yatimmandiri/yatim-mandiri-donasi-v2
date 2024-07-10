import { ProgramComponent } from '@/components/sections/ProgramComponent';
import { CampaignProvider } from '@/hooks/useCampaign';
import { AppLayout } from '@/layouts/AppLayout';
import { GetDataCampaign, GetDataCategory } from '@/services/AppService';

export default async function ProgramPage() {
  const [categories, programs] = await Promise.all([
    GetDataCategory({ status: 'Y' }),
    GetDataCampaign({ per_page: 10, status: 'Y' }),
  ]);

  const contextValue = {
    headers: {
      backButton: true,
      fixed: true,
      title: 'Semua Program',
    },
    pages: true,
  };

  return (
    <AppLayout context={contextValue}>
      <div className='block space-y-4 p-4'>
        <CampaignProvider
          title='Program Special Yatim Mandiri'
          data={programs?.data.data}
          dataTotal={programs?.data.pagination.last_page}
          perPage={programs?.data.pagination.per_page}
          page={programs?.data.pagination.page}
          infinite={true}
          searching={true}
          filtering={true}
        >
          <ProgramComponent categories={categories?.data} />
        </CampaignProvider>
      </div>
    </AppLayout>
  );
}
