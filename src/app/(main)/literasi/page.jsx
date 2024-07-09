import { PilihanLiterasiComponent } from '@/components/sections/PilihanLiterasiComponent';
import { AppLayout } from '@/layouts/AppLayout';
import { GetDataBlog, GetDataNews } from '@/services/AppService';

export default async function LiterasiPage() {
  const [news, blogs] = await Promise.all([
    GetDataNews({ page: 1 }),
    GetDataBlog({ page: 1 }),
  ]);

  const contextValue = {
    headers: {
      logo: true,
      fixed: true,
    },
  };

  return (
    <AppLayout context={contextValue}>
      <div className='flex p-4'>
        <PilihanLiterasiComponent news={news} blogs={blogs} />
      </div>
    </AppLayout>
  );
}
