import { CategoriesComponent } from '@/components/sections/CategoriesComponent';
import { AppLayout } from '@/layouts/AppLayout';
import { GetDataCategory } from '@/services/AppService';

export const metadata = {
  alternates: {
    canonical: '/kategori',
  },
};

export default async function KategoriPage() {
  const [categories] = await Promise.all([GetDataCategory({ status: 'Y' })]);

  const contextValue = {
    headers: {
      backButton: true,
      fixed: true,
      title: 'Semua Kategori',
    },
    pages: true,
  };

  return (
    <AppLayout context={contextValue}>
      <div className='block space-y-4 p-4'>
        <CategoriesComponent
          title='Semua Program Yatim Mandiri'
          data={categories?.data}
        />
      </div>
    </AppLayout>
  );
}
