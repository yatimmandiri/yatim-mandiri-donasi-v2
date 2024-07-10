import { CategoriesComponent } from '@/components/sections/CategoriesComponent';
import { AppLayout } from '@/layouts/AppLayout';
import { GetDataCategory } from '@/services/AppService';

export default async function KategoriPage() {
  const [categories] = await Promise.all([GetDataCategory({ status: 'Y' })]);

  return (
    <AppLayout>
      <div className='block space-y-4 p-4'>
        <CategoriesComponent
          title='Semua Program Yatim Mandiri'
          data={categories?.data}
        />
      </div>
    </AppLayout>
  );
}
