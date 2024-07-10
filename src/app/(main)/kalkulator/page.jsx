import { BoxKalkulatorComponent } from '@/components/sections/BoxKalkulatorComponent';
import { DisclaimerComponent } from '@/components/sections/DisclaimerComponent';
import { PilihanZakatComponent } from '@/components/sections/PilihanZakatComponent';
import { KalkulatorProvider } from '@/hooks/useKalkulator';
import { AppLayout } from '@/layouts/AppLayout';
import { GetDataHargaEmas } from '@/services/AppService';

export const metadata = {
  title: 'Kalkulator Zakat - Hitung Zakat Mal, Pertanian Anda Sekarang',
  description:
    'Bingung harus mengeluarkan zakat berapa dari total harta yang Anda miliki? Kini semakin mudah dengan fitur kalkulator zakat dari Yatim Mandiri. Yuk hitung dan bayarkan sekarang.',
  alternates: {
    canonical: '/kalkulator',
  },
};

export default async function KalkulatorPage() {
  const hargaEmas = await GetDataHargaEmas();

  const contextValue = {
    headers: {
      logo: true,
      fixed: true,
    },
  };

  return (
    <AppLayout context={contextValue}>
      <div className='flex flex-col space-y-4 p-4'>
        <BoxKalkulatorComponent />
        <KalkulatorProvider data={hargaEmas}>
          <PilihanZakatComponent />
          <DisclaimerComponent />
        </KalkulatorProvider>
      </div>
    </AppLayout>
  );
}
