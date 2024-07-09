import { BoxKalkulatorComponent } from '@/components/sections/BoxKalkulatorComponent';
import { DisclaimerComponent } from '@/components/sections/DisclaimerComponent';
import { PilihanZakatComponent } from '@/components/sections/PilihanZakatComponent';
import { KalkulatorProvider } from '@/hooks/useKalkulator';
import { AppLayout } from '@/layouts/AppLayout';
import { GetDataHargaEmas } from '@/services/AppService';

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
