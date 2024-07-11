import { ButtonComponent } from '@/components/partials/ButtonComponent';
import { BenefitComponent } from '@/components/sections/BenefitComponent';
import { BerbagiLebihMudahComponent } from '@/components/sections/BerbagiLebihMudahComponent';
import { FaqComponent } from '@/components/sections/FaqComponent';
import { ProgramComponent } from '@/components/sections/ProgramComponent';
import { CampaignProvider } from '@/hooks/useCampaign';
import { AppLayout } from '@/layouts/AppLayout';
import {
  GetDataCampaign,
  GetDataCategory,
  GetDataFaqs,
} from '@/services/AppService';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const [categories] = await Promise.all([
    GetDataCategory({
      slug: params.categories,
    }),
  ]);

  if (!categories.data[0]) {
    notFound();
  }

  switch (categories.data[0].slug) {
    case 'zakat':
      return {
        title: 'Bayar Zakat Online Mudah Sesuai Syariat di Yatim Mandiri',
        description: `Zakat adalah bagian harta yang wajib dikeluarkan jika sudah mencapai nishabnya. Yuk bayar zakat online malalui platform digital Yatim Mandiri. - Platform Donasi Online`,
        alternates: {
          canonical: `/${categories.data[0].slug}`,
        },
      };
    case 'dakwah':
      return {
        title: 'Sedekah untuk Program Syiar Dakwah di Indonesia',
        description: `Donasi untuk program dakwah yang akan disalurkan kepada para penggiat dakwah di seluruh wilayah Indonesia. Yuk jadi satu dari sekian banyak para donatur - Platform Donasi Online`,
        alternates: {
          canonical: `/${categories.data[0].slug}`,
        },
      };
    case 'wakaf':
      return {
        title: 'Bayar Wakaf Online Sekarang Tebar Kebaikan untuk Umat',
        description: `Wakaf menjadi ibadah sunnah dengan pahala berlipat. Yuk Nikmati kemudahan wakaf online melalui platform online Yatim Mandiri dan bantu sejahterakan umat melalui program-program wakaf - Platform Donasi Online`,
        alternates: {
          canonical: `/${categories.data[0].slug}`,
        },
      };
    case 'qurban':
      return {
        title: 'Qurban Online - Solusi Qurban Mudah dan Amanah',
        description: `Mudahnya kurban online di Yatim Mandiri, hewan sehat, penyembelihan sesuai syariat dan tersalurkan. Tunggu apalagi, yuk Qurban di Yatim Mandiri dan dapatkan beragam keuntungan.`,
        alternates: {
          canonical: `/${categories.data[0].slug}`,
        },
      };
    case 'pendidikan':
      return {
        title: 'Pendidikan',
        description: `Pendidikan menjadi salah satu aspek yang wajib diperhatikan. Namun disekeliling kita masih banyak anak-anak yang tidak bersekola. Yuk bantu mereka dengan ikut berdonasi melalui program pendidikan Yatim Mandiri - Platform Donasi Online`,
        alternates: {
          canonical: `/${categories.data[0].slug}`,
        },
      };
    case 'kesehatan':
      return {
        title: 'Kesehatan',
        description: `Mari dukung program layanan kesehatan dari Yatim Mandiri untuk meningkatkan kualitas kesehatan masyarakat Yatim dan Dhuafa. - Platform Donasi Online`,
        alternates: {
          canonical: `/${categories.data[0].slug}`,
        },
      };

    default:
      break;
  }
}

export default async function DetailCategoriesPage({ params }) {
  const [categories] = await Promise.all([
    GetDataCategory({
      slug: params.categories,
    }),
  ]);

  if (!categories.data[0]) {
    notFound();
  }

  const [campaigns, faqs] = await Promise.all([
    GetDataCampaign({
      categories_id: categories.data[0].id,
      status: 'Y',
      per_page: 5,
    }),
    GetDataFaqs({
      categories_id: categories.data[0].id,
      status: 'Y',
    }),
  ]);

  const contextValue = {
    headers: {
      backButton: true,
    },
    navigation: true,
  };

  return (
    <AppLayout context={contextValue}>
      <figure className='relative w-full h-56'>
        <Image
          src={
            categories.data[0].feature_image
              ? `${process.env.NEXT_PUBLIC_SITE_STORAGE}/${categories.data[0].feature_image}`
              : '/assets/images/placeholder.jpg'
          }
          alt={categories.data[0].name}
          fill={true}
          priority={true}
          sizes='(max-width: 768px) 100vw'
        />
      </figure>
      <div className='relative -mt-3 z-10 rounded-t-xl bg-white flex flex-col space-y-4 p-4'>
        <ButtonComponent text={categories.data[0].name} color='primary' />
        <CampaignProvider
          data={campaigns?.data.data}
          dataTotal={campaigns?.data.pagination.last_page}
          perPage={campaigns?.data.pagination.per_page}
          loadingbottom={true}
          categoriesId={categories.data[0].id}
          title={`Program ${categories.data[0].name}`}
        >
          <ProgramComponent />
        </CampaignProvider>
        <BenefitComponent />
        <BerbagiLebihMudahComponent />
        <FaqComponent data={faqs?.data} />
      </div>
    </AppLayout>
  );
}
