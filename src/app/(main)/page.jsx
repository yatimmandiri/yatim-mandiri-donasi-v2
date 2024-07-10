import { BeritaPenyaluranComponent } from '@/components/sections/BeritaPenyaluranComponent';
import { CategoriesComponent } from '@/components/sections/CategoriesComponent';
import { CekProgramLainnyaComponent } from '@/components/sections/CekProgramLainnyaComponent';
import { MajalahComponent } from '@/components/sections/MajalahComponent';
import { PilihanProgramComponent } from '@/components/sections/PilihanProgramComponent';
import { RecomendationProgramComponent } from '@/components/sections/RecomendationProgramComponent';
import { SliderComponent } from '@/components/sections/SliderComponent';
import { TunaikanZakatComponent } from '@/components/sections/TunaikanZakatComponent';
import { CampaignProvider } from '@/hooks/useCampaign';
import { AppLayout } from '@/layouts/AppLayout';
import {
  GetDataCampaign,
  GetDataCategory,
  GetDataNews,
  GetDataSlider,
} from '@/services/AppService';

export default async function HomePage() {
  const [sliders, categories, programPopuler, programPilihan, news] =
    await Promise.all([
      GetDataSlider({ group: 'Slider' }),
      GetDataCategory({ per_page: 7, populer: 'Y', status: 'Y' }),
      GetDataCampaign({ per_page: 3, recomendation: 'Y', status: 'Y' }),
      GetDataCampaign({ recomendation: 'Y', status: 'Y' }),
      GetDataNews({ page: 1 }),
    ]);

  const contextValue = {
    headers: {
      logo: true,
      fixed: true,
    },
  };

  return (
    <AppLayout context={contextValue}>
      <SliderComponent data={sliders?.data} />
      <div className='block space-y-4 p-4'>
        <CategoriesComponent data={categories?.data.data} />
        <MajalahComponent />
        <CampaignProvider
          data={programPopuler?.data.data}
          dataTotal={programPopuler?.data.pagination.last_page}
          perPage={programPopuler?.data.pagination.per_page}
          recomendation={true}
          title='Program Rekomendasi'
        >
          <RecomendationProgramComponent title='Rekomendasi Program' />
        </CampaignProvider>
        <TunaikanZakatComponent />
        <PilihanProgramComponent data={programPilihan?.data} />
      </div>
      <CekProgramLainnyaComponent />
      <div className='block space-y-4 p-4'>
        <BeritaPenyaluranComponent data={news?.data} />
      </div>
    </AppLayout>
  );
}
