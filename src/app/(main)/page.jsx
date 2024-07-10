import { BeritaPenyaluranComponent } from '@/components/sections/BeritaPenyaluranComponent';
import { CategoriesComponent } from '@/components/sections/CategoriesComponent';
import { SliderComponent } from '@/components/sections/SliderComponent';
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

  return (
    <AppLayout>
      <SliderComponent data={sliders?.data} />
      <div className='block space-y-4 p-4'>
        <CategoriesComponent data={categories?.data.data} />
      </div>
      <div className='block space-y-4 p-4'>
        <BeritaPenyaluranComponent data={news?.data} />
      </div>
    </AppLayout>
  );
}
